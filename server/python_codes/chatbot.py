from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.messages import HumanMessage

from flask_cors import CORS

# Load env vars
load_dotenv()
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_API_KEY"] = os.getenv("LANGSMITH_API_KEY")
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

# Initialize LangChain model
model = init_chat_model("llama3-8b-8192", model_provider="groq")
workflow = StateGraph(state_schema=MessagesState)

def call_model(state: MessagesState):
    response = model.invoke(state["messages"])
    return {"messages": [response]}  # FIXED HERE

workflow.add_node("model", call_model)
workflow.add_edge(START, "model")
memory = MemorySaver()
app_graph = workflow.compile(checkpointer=memory)

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    print("------ Received Request ------")
    data = request.get_json(force=True)
    print("Request data:", data)

    query = data.get("query", "")
    user_data = data.get("user_data", {})

    input_messages = [HumanMessage(content=query)]

    config = {
        "configurable": {
            "thread_id": user_data.get("thread_id", "default-thread"),
            "user_id": user_data.get("user_id", "default"),
            "health_focus": user_data.get("health_focus", "general"),
            "age": user_data.get("age", ""),
            "gender": user_data.get("gender", ""),
            "known_conditions": user_data.get("known_conditions", []),
            "medications": user_data.get("medications", [])
        }
    }

    try:
        print("Invoking model with:", query)
        output = app_graph.invoke({"messages": input_messages}, config)
        print("Model raw response:", output)

        response = output["messages"][-1].content if output and "messages" in output else "No response"
        print("Final Response to send:", response)
        return jsonify({"response": response})
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
    
