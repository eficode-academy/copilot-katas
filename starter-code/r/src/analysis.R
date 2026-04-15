# ============================================================
# Sales Data Analysis
#
# This is the main entry point for the R data analysis exercises.
#
# GitHub Copilot Katas - R Version
#
# To run:
#   Rscript src/analysis.R
#   or open in RStudio and run line by line
#
# Exercises:
#   1. Load and explore sales data
#   2. Clean and transform the data
#   3. Compute sales statistics by region and product
#   4. Visualize trends (if ggplot2 is available)
# ============================================================

# Load required packages
# Hint: use library() - let Copilot suggest which packages to load

# ============================================================
# Exercise 1: Load and Explore the Data
# ============================================================

# Load the CSV file from data/sample_sales.csv into a data frame called `sales`
# Then let Copilot help you explore it (head, str, summary, nrow, ncol)

# ============================================================
# Exercise 2: Data Cleaning and Transformation
# ============================================================

# Source the data processing functions
source("src/data_processor.R")

# Call the cleaning function and store the result
# Then verify that the date column is of type Date and
# that the revenue column has been added

# ============================================================
# Exercise 3: Aggregation and Summary Statistics
# ============================================================

# Use dplyr (or base R) to:
#   - Calculate total revenue by region
#   - Calculate total revenue by product category
#   - Identify the top-performing sales representative
#   - Find the best-selling product by units sold

# ============================================================
# Exercise 4: Visualization (optional – requires ggplot2)
# ============================================================

# Source the visualisation functions
source("src/visualizer.R")

# Plot monthly revenue trend
# Plot revenue breakdown by region
