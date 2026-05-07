# GitHub Copilot Katas – R Data Analysis

A self-contained R project for the **R Data Analysis** lab exercise.

## Prerequisites

- R 4.2 or later ([Download](https://cran.r-project.org/))
- VS Code with the [R extension](https://marketplace.visualstudio.com/items?itemName=REditorSupport.r)

## Installing Packages

Open an R console in your terminal and install the required packages:

```bash
# Start the R console
R
```

```r
# Inside the R console, run:
install.packages(c("dplyr", "ggplot2", "lubridate", "readr", "forecast"))

# When done, quit the R console
q()
```

> **Tip:** Type `R` in your terminal to start an interactive R session, and
> `q()` (or press `Ctrl+D`) to exit it.

## Running the Analysis

From the terminal (from this directory):

```bash
Rscript src/analysis.R
```

Or open `src/analysis.R` in VS Code and run sections interactively using the
R extension.

## Project Structure

```
r/
├── README.md
├── data/
│   └── sample_sales.csv    ← provided sample dataset
└── src/
    ├── analysis.R           ← main script (start here)
    ├── data_processor.R     ← data cleaning & transformation functions
    └── visualizer.R         ← ggplot2 visualisation functions
```

## Dataset

`data/sample_sales.csv` contains fictional quarterly sales records with the
following columns:

| Column       | Description                        |
|--------------|------------------------------------|
| date         | Transaction date (YYYY-MM-DD)      |
| region       | Sales region (North/South/East/West)|
| product      | Product name                       |
| category     | Product category                   |
| units_sold   | Number of units sold               |
| unit_price   | Price per unit (USD)               |
| discount     | Discount applied (0.0 – 1.0)       |
| sales_rep    | Name of the sales representative   |
