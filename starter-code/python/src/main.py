"""
Todo App - Main Application Entry Point

This is the starting point for the Todo application.
Work through the GitHub Copilot Katas exercises to build this app!

GitHub Copilot Katas - Python Version

To run:
    python src/main.py

Then open http://localhost:5000 in your browser.
"""

from flask import Flask, render_template_string, jsonify

app = Flask(__name__)

# HTML template for the simple todo app interface
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            padding: 30px;
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        
        .coming-soon {
            text-align: center;
            color: #666;
            padding: 40px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 Todo App (Python)</h1>
        
        <div class="coming-soon">
            <h2>Coming Soon!</h2>
            <p>Start the exercises to build this app with GitHub Copilot</p>
        </div>
    </div>
</body>
</html>
"""


@app.route('/')
def index():
    """Render the main page."""
    return render_template_string(HTML_TEMPLATE)


@app.route('/api/todos')
def get_todos():
    """Get all todos - TODO: Implement in exercises."""
    return jsonify([])


if __name__ == '__main__':
    print("""
🚀 Todo App Server Running!
   
   Open http://localhost:5000 in your browser
   
   Ready for GitHub Copilot Katas exercises!
   Press Ctrl+C to stop the server.
""")
    app.run(debug=True, port=5000)


# ============================================
# TODO: Build your Todo application below!
# ============================================

# Exercise 1: Create a Todo class in todo.py
# Hint: A todo should have: id, text, completed, created_at

# Exercise 1: Create a TodoList class in todo_list.py
# Hint: Start with a comment describing what the class should do

# Exercise 2+: Add more features as you progress through the labs!
