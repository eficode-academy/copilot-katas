# ============================================================
# Data Processor
#
# This file will contain functions for cleaning and
# transforming the sales data.
#
# GitHub Copilot Katas - R Version
#
# Functions to implement (let Copilot help you!):
#   - clean_sales_data(df)      : parse dates, add revenue column, remove NAs
#   - add_revenue_column(df)    : calculate revenue = units_sold * unit_price * (1 - discount)
#   - filter_by_region(df, region) : return rows matching the given region
#   - summarise_by_category(df) : total revenue and units per category
# ============================================================

# ============================================================
# Exercise 2: Implement the data processing functions below.
# Start by writing a comment describing each function,
# then let Copilot suggest the implementation.
# ============================================================

# Function to clean the raw sales data frame:
#   - Convert the 'date' column to Date type
#   - Add a 'revenue' column: units_sold * unit_price * (1 - discount)
#   - Remove any rows that contain NA values

# Function to add a revenue column to a sales data frame
# Revenue = units_sold * unit_price * (1 - discount)

# Function to filter sales data by a specific region (case-insensitive)

# Function to summarise total revenue and total units sold, grouped by category
