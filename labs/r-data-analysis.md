# Lab R – R Data Analysis with GitHub Copilot

## Learning Goals

By the end of this lab, you will be able to:
- Use inline completion to write idiomatic R data-wrangling code
- Use Copilot Chat to explore, clean, and transform a real dataset
- Generate statistical summaries and visualisations with Copilot's help
- Apply Agent Mode to build a complete analytical script end-to-end
- Write better R-specific prompts for more accurate Copilot suggestions

## Introduction

This lab is designed for developers who primarily work in **R**. Instead of a
generic Todo application, you will analyse a realistic sales dataset using the
tools and idioms R developers use every day:

- `readr` / base `read.csv` for data loading
- `dplyr` for data manipulation
- `ggplot2` for visualisation
- `lubridate` for date handling
- Base R statistics (`mean`, `sd`, `cor`, `lm`, …)

All exercises follow the same Copilot workflow as the other labs – but every
example is grounded in data analysis rather than application development.

> **Note:** You do **not** need to complete the other labs before this one.
> This lab stands alone and covers inline completion, Chat, and Agent Mode in
> the context of R.

## Prerequisites

1. R 4.2 or later ([CRAN](https://cran.r-project.org/))
2. RStudio **or** VS Code with the
   [R extension](https://marketplace.visualstudio.com/items?itemName=REditorSupport.r)
3. GitHub Copilot Chat extension installed and activated
4. Required packages (run once in an R console):

```r
install.packages(c("dplyr", "ggplot2", "lubridate", "readr"))
```

## Setting Up

```bash
cd starter-code/r
```

Open `src/analysis.R` as your primary working file. This is the file
Copilot will use for most of its context.

---

## Exercise 1: Loading and Exploring Data (Inline Completion)

### Task 1.1: Load the Dataset

Open `src/analysis.R` and let Copilot help you load the CSV file.

Type the following comment and press **Enter**:

```r
# Load the sales data from data/sample_sales.csv into a data frame called sales
```

**✅ Try This:**
1. Type the comment and press `Enter`
2. Wait for Copilot's inline suggestion (ghost text)
3. Press `Tab` to accept, or `Esc` to dismiss and try a different approach
4. Observe whether Copilot chooses `read.csv()` or `readr::read_csv()` – try
   pressing `Alt+]` (Windows) to see alternative suggestions

### Task 1.2: Explore the Data Structure

After loading, add these comments one by one and let Copilot complete each:

```r
# Show the first 6 rows of the sales data frame
```

```r
# Print a compact summary of the structure of sales (types, sample values)
```

```r
# Display descriptive statistics for all numeric columns
```

```r
# Count the number of rows and columns in the data frame
```

**💡 Tip:** Copilot reads the name `sales` as context. If you rename the
variable, Copilot will automatically use the new name in its suggestions.

### Task 1.3: Unique Values and Distributions

```r
# Print all unique values in the region column
```

```r
# Count how many transactions belong to each product category
```

```r
# Find the date range covered by this dataset (earliest and latest date)
```

**🔬 Experiment:** Try asking for the same thing in different ways:
- `# List unique regions` vs `# Get distinct values from the region column`

Notice how the phrasing affects the suggested function (`unique()` vs
`dplyr::distinct()`).

---

## Exercise 2: Data Cleaning and Transformation (Inline Completion)

Open `src/data_processor.R`. You will implement several data-processing
functions here.

### Task 2.1: Parse Dates

The `date` column is loaded as a character string. Write a comment and let
Copilot convert it:

```r
# Convert the date column from character to Date type using as.Date
```

**Observe:** Copilot should suggest the correct format string (`"%Y-%m-%d"`)
because it can see the sample data nearby.

### Task 2.2: Add a Revenue Column

Revenue = `units_sold × unit_price × (1 – discount)`.

```r
# Add a revenue column: units_sold * unit_price * (1 - discount)
```

Try making the comment more specific and see how the suggestion changes:

```r
# Add a new column called 'revenue' that equals units_sold multiplied by unit_price multiplied by (1 minus discount), using dplyr mutate
```

### Task 2.3: Handle Missing Values

```r
# Remove rows that contain any NA values from the data frame
```

```r
# Print the number of rows before and after removing NAs
```

### Task 2.4: Implement the clean_sales_data Function

Now wrap all the transformations into a reusable function. Type:

```r
# Function to clean the raw sales data frame:
# - Convert date column to Date type
# - Add a revenue column
# - Remove rows with NA values
# Returns the cleaned data frame
clean_sales_data <- function(df) {
```

Press `Enter` inside the function body and let Copilot suggest the
implementation. Use **partial accept** (`Ctrl+→` on Windows / `Cmd+→` on Mac)
to accept one expression at a time.

**💡 Tip – partial accept:**

| Shortcut | Action |
|---|---|
| `Cmd+→` / `Ctrl+→` | Accept next word |
| `Tab` | Accept entire suggestion |
| `Esc` | Dismiss and keep typing |

---

## Exercise 3: Statistical Summaries (Chat – Ask Mode)

Open Copilot Chat (`Ctrl+Shift+I` / `Cmd+Shift+I`) and make sure **Ask Mode**
is selected.

### Task 3.1: Ask About Your Data

With `src/analysis.R` open (and mentioned as context), try these prompts:

```
What dplyr pipeline would calculate total revenue grouped by region, 
sorted from highest to lowest?
```

```
How do I calculate the mean, median, and standard deviation of units_sold 
for each product category?
```

```
Show me how to find the top 3 sales representatives by total revenue
```

**✅ Observe:**
- How Chat structures multi-step dplyr pipelines
- How it adapts suggestions to your column names

### Task 3.2: Use Slash Commands

**`/explain`** – Select one of the pipelines Chat suggested and type:
```
/explain
```

**`/fix`** – Introduce a deliberate bug:
```r
# Bug: wrong column name
total_by_region <- sales |>
  group_by(area) |>       # 'area' does not exist
  summarise(revenue = sum(revenue))
```
Select the code and type `/fix`.

**`/doc`** – Select `clean_sales_data` and type:
```
/doc
```
Observe how Copilot generates roxygen2-style documentation.

**`/tests`** – Select a function and type:
```
/tests using testthat
```

### Task 3.3: Context References

```
#file:data_processor.R Does this file handle the case where the 
discount column contains values outside the range 0–1?
```

```
@workspace What functions have been defined so far across all R files?
```

---

## Exercise 4: Data Visualization (Inline Completion)

Open `src/visualizer.R`.

### Task 4.1: Monthly Revenue Trend

```r
# Plot monthly total revenue as a line chart using ggplot2
# x-axis: month (extract from date column), y-axis: total revenue
```

Copilot should suggest something involving `lubridate::floor_date` or
`format(date, "%Y-%m")` to aggregate by month.

### Task 4.2: Revenue by Region

```r
# Create a bar chart of total revenue by region, sorted from highest to lowest
# Use reorder() to sort the bars
```

### Task 4.3: Top Products

```r
# Horizontal bar chart of the top 5 products by total revenue
# Flip coordinates so product names are on the y-axis
```

### Task 4.4: NES – Pattern Recognition

1. Create two ggplot charts with similar structure
2. Edit the title of the first chart
3. Look for the **Next Edit Suggestion** indicator – Copilot may suggest
   updating the second chart's title in the same way
4. Press `Tab` to accept

---

## Exercise 5: Build a Complete Analysis Script (Agent Mode)

Switch Copilot Chat to **Agent Mode** for this exercise.

### Task 5.1: Generate a Full Report Script

In Agent Mode, paste this prompt:

```
I have a sales CSV at data/sample_sales.csv with columns:
date, region, product, category, units_sold, unit_price, discount, sales_rep.

Create a complete R script called src/report.R that:
1. Loads the data using readr::read_csv
2. Cleans it (parse dates, add revenue column, drop NAs)
3. Prints a summary table: total revenue and units sold per region
4. Prints the top 5 products by revenue
5. Saves a ggplot2 bar chart of revenue by region as output/revenue_by_region.png
6. Prints a simple linear regression of revenue ~ units_sold and shows the R²

Use dplyr and ggplot2. Add comments explaining each step.
```

**Observe Agent Mode:**
- Copilot creates the file autonomously
- It may ask clarifying questions before proceeding
- It runs the file and iterates if there are errors

### Task 5.2: Iterative Refinement

After reviewing the generated script, ask Copilot to improve it:

```
Add a second chart showing monthly revenue trend as a line plot 
and save it as output/monthly_trend.png
```

```
Wrap the cleaning and aggregation steps in named functions and 
move them to data_processor.R
```

---

## Exercise 6: Advanced Techniques

### Task 6.1: Inline Chat for Quick Edits

Press `Ctrl+I` / `Cmd+I` to open inline chat on a selected code block.

**Try these prompts on your summary pipeline:**
- `"Make this pipeline handle the case where revenue is NA"`
- `"Rewrite this using base R instead of dplyr"`
- `"Add a percentage-of-total column to this summary"`

### Task 6.2: Specificity Experiment

Compare how vague vs. specific comments affect suggestions:

**Vague:**
```r
# filter the data
```

**Specific:**
```r
# Filter to keep only Electronics category rows where revenue > 500
```

**Very specific:**
```r
# Filter the sales data frame to rows where category equals "Electronics"
# and revenue is greater than 500, returning a new data frame
```

### Task 6.3: Statistical Modelling

Let Copilot help you build a simple model. Type these comments one at a time:

```r
# Fit a linear regression model to predict revenue from units_sold
```

```r
# Print the model summary including R-squared and coefficient p-values
```

```r
# Create a residuals vs fitted plot to check model assumptions
```

---

## Challenges

### Challenge 1: Sales Rep Performance Dashboard

Write a comment block describing a function that takes the cleaned sales data
and returns a data frame ranking each sales rep by:
- Total revenue
- Average discount given
- Number of transactions
- Most sold product category

Let Copilot generate the full implementation.

### Challenge 2: Outlier Detection

Ask Copilot Chat:

```
How would I detect and flag outlier transactions in this dataset 
using the IQR method on the revenue column?
```

Implement the suggestion and test it with the sample data.

### Challenge 3: Time-Series Forecasting

```
Using the monthly revenue data I have, show me how to fit a simple 
exponential smoothing model with the forecast package and plot 
a 3-month ahead forecast
```

---

## Key Takeaways

| Concept | R-specific tip |
|---|---|
| **Name your variables clearly** | `clean_sales` vs `df2` – Copilot uses variable names as context |
| **Comment-driven development** | Describe the transformation in plain English before writing code |
| **Specify packages** | Mention `dplyr`, `ggplot2`, `data.table` in comments to steer suggestions |
| **Partial accept** | Accept one pipe stage at a time with `Ctrl+→` |
| **Chat for pipelines** | Long dplyr/ggplot2 chains are ideal for Chat; iterate conversationally |
| **Agent Mode for scripts** | Let Agent Mode scaffold entire analysis scripts, then refine |

---

## What's Next?

You've explored the core Copilot features through a data-analysis lens. For
deeper customisation, see:

- [Lab 06 – Custom Instructions](06-instructions.md) – teach Copilot your team's R conventions
- [Lab 07 – Prompt Files](07-prompts.md) – create reusable analysis templates
- [Lab 09 – Custom Skills](09-skills.md) – encode domain expertise (e.g., your company's data schemas)
