"""
Todo Model

This file will contain the Todo class definition.

GitHub Copilot Katas - Exercise 1

A Todo item should have:
- id: unique identifier
- text: the todo description
- completed: boolean status
- created_at: timestamp when created
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional

# ============================================
# Exercise 1: Create your Todo class here!
# ============================================

# Start by typing a comment describing the Todo class,
# then let Copilot help you implement it.

# You can use a dataclass or a regular class.
# Example comment to try:
# Create a Todo dataclass with properties: id (int), text (str), 
# completed (bool, default False), and created_at (datetime, default now)

# Alternatively, try a regular class:
# class Todo:
#     """Represents a single todo item."""
#     
#     def __init__(self, id: int, text: str, completed: bool = False):
#         # Let Copilot complete this
#         pass
