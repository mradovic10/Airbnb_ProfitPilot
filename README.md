# Airbnb Profit Pilot

<p align="center">
  <img src="https://projec4gtbootcampwebsite.s3.amazonaws.com/assets/img/logo.png" alt="logo" width="600" height="500"/>
</p>

# Table of Contents

- [About](#about)
- [Data Acquisition](#dataacquisition)
- [Data Cleaning](#datacleaning)
- [Feature Engineering](#featureengineering)
- [Machine Learning](#machinelearning)
- [Deployment](#deployment)
- [Next Steps](#nextsteps)
- [Team](#team)

# About

Do you have a vacation home that you want to list on Airbnb, but are unsure of the proper
listing price that will be competitive and create passive income for you? Look no further
than Airbnb Profit Pilot! Our machine learning model, given a set amount of inputs about 
your property (bedrooms, baths, etc.), will generate a competitve price for you in seconds,
taking the guesswork out of the equation. Our model is based on historical price and features
from thousands of Airbnb listings. The current offering is available for the cities of San Diego,
New York City, and Seattle.

[(Back to top)](#table-of-contents)

# Data Acquisition

The data used for this project was compiled by folks at insideairbnb.com through publicly available
sources. We downloaded the gzipped listings files for each city used and uploaded them to our AWS s3
bucket for use in our notebooks, via a publicly accessible s3 URL. The data was last updated by 
insideairbnb on 03/25/2023.

[(Back to top)](#table-of-contents)

# Data Cleaning

The amount of features provided for each listing in the datasets was rather extensive, so a fair
amount of cleaning was needed in order to create good modeling. This cleaning process was conducted 
in jupyter notebooks using the pandas library mostly. One of the biggest tasks of this process was 
converting the listing's neighborhoods to zipcodes. We achieved this with the help of OpenStreetMap's
Nominatim tool. Found here: https://nominatim.openstreetmap.org/ Each city's data had a similarly formatted
csv and thus the same cleaning process was performed for each city. Features of note to be cleaned 
were the amenities, bathrooms, and bedrooms. Outliers were also removed from these categories.

PLEASE NOTE: THE CLEANING NOTEBOOKS HAVE ALREADY BEEN RUN SO THE USER DOESN'T HAVE TO. 
IF YOU WERE TO RUN THE ZIPCODE NOTEBOOKS THEY COULD TAKE HOURS!!!!!!!!!!!!!!!!!!

### Cleaning Workflow

* data_cleaning_zipcode.ipynb (outputs listings_{city}_zipcode.csv to Resources)

    - data_cleaning.ipynb (outputs cleaned_data_{city}_final.csv to Resources)

This flow is the same for San Diego and Seattle, but for New York, we have hosted the zipcode csv
in AWS s3 because of file size considerations.

[(Back to top)](#table-of-contents)

# Feature Engineering

Before we could fit our data to an ML model, we needed to engineer the features into appropriate formats.
The cleaned datasets have both categorical as well as numerical feature data which needed to be dummied
as well as scaled. Through a PCA analysis we also were able to discern the features which needed to be
binned in order to reduce noise. Amenities, bathrooms, bedrooms, and years in business.

[(Back to top)](#table-of-contents)

# Machine Learning

### Predicting Price

In order to predict the proper pricing of an airbnb listing we used regression modeling. At first,
we tried Random Forest, XGBoost, and Neural Network regressors, coming to find that Random Forests
performed best considering r2 and rMSE calculations.

### Predicting Revenue

We also wanted to give the user insight into how revenue from a listing using our price predictor
might compare to characteristically similar listings in their city. Therefore, we decided to build 
a classifier model to predict whether a given price would generate yearly revenue above or below the
50th percentile for the same amount of bedrooms. In other words, will this price generate revenue that is above or below the median for the city. Random Forest classifier was the best performing model for this situation as seen through good precision for '>50th' classification.

### Model Workflow

* Random_Forest_Regressor_Price.ipynb (at bottome there is joblib write and read of model for testing)

    - Random_Forest_Classifier_Revenue.ipynb (at bottome there is joblib write and read of model for testing)

### Exploring Review Scores

The team also hypothesized that the review scores could be one of the better predictors of price, revenue,
and availability. Using Random Forest Classifier, Random Forest Regressor, Isolation Forest, and Logistic 
Regression we explored this possibility, coming to find that our assumption wasn't correct. While consumers
use review scores a good amount to compare listings and help choose, these review scores weren't very good
at predicting how a listing might do monetarily. This may be due to the manner in which insideairbnb.com 
aggregated availability of Airbnb rentals, thereby minimizing the impact of review scores on our target variables.
A worthwhile piece of information that was gained through this exploration is that host communication and 
check-in scores seem to influence Airbnb success the least out of all review types. Their feature 
importance scores were consistently the lowest in all models.

The notebook files dedicated to this exploration can be found in the “review_scores_ml” directory.

[(Back to top)](#table-of-contents)

# Deployment

The data used for this project is stored in an AWS s3 bucket, with public access rights via a URL.
The front end prototype and presentation piece is a static website hosted in a separate AWS s3 
bucket with the following URL: 

http://projec4gtbootcampwebsite.s3-website-us-east-1.amazonaws.com/

[(Back to top)](#table-of-contents)

# Next Steps

* Add more cities across the US
* Develop a dynamic website with server side processing of input features to run through our model

[(Back to top)](#table-of-contents)

# Team

* Miodrag Radovic:
    - https://github.com/mradovic10
* Negin Kananizadeh
    - https://github.com/neginkanani
* Chad Barlow
    - https://github.com/chadbarlow
* Reid Walker
    - https://github.com/rbw9891
    
[(Back to top)](#table-of-contents)