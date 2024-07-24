import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv("epa-sea-level.csv")

    # Create scatter plot
    fig, ax = plt.subplots()
    plt.scatter(df["Year"], df["CSIRO Adjusted Sea Level"])

    # Create first line of best fit
    min_year = int(df["Year"].min())
    max_year = 2051

    first_line_gress = linregress(df["Year"], df["CSIRO Adjusted Sea Level"])
    x_prediction = pd.Series([i for i in range(min_year, max_year)])
    y_prediction = first_line_gress.slope * x_prediction + first_line_gress.intercept
    plt.plot(x_prediction, y_prediction, "r")

    # Create second line of best fit
    df_2000 = df[df["Year"] >= 2000]
    min_year_2000 = 2000
    max_year_2000 = 2051

    first_line_gress_2000 = linregress(df_2000["Year"], df_2000["CSIRO Adjusted Sea Level"])
    x_prediction_2000 = pd.Series([j for j in range(min_year_2000, max_year_2000)])
    y_prediction_2000 = first_line_gress_2000.slope * x_prediction_2000 + first_line_gress_2000.intercept
    plt.plot(x_prediction_2000, y_prediction_2000)

    # Add labels and title
    ax.set_xlabel("Year")
    ax.set_ylabel("Sea Level (inches)")
    ax.set_title("Rise in Sea Level")

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()