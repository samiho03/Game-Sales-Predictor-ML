from flask import Flask, render_template, request
import pickle
import numpy as np

# Setup application
app = Flask(__name__)
#cross origins
def prediction(lst):
    filename = 'model/predictor.pickle'
    with open(filename, 'rb') as file:
        model = pickle.load(file)
    pred_value = model.predict([lst])
    return pred_value

@app.route('/', methods=['POST', 'GET'])
def index():
    pred_value = 0
    if request.method == 'POST':
        # Extract numerical features
        year = int(request.form['year'])
        na_sales = float(request.form['na_sales'])
        eu_sales = float(request.form['eu_sales'])
        jp_sales = float(request.form['jp_sales'])
        other_sales = float(request.form['other_sales'])

        # Extract categorical features
        platform = request.form['platform']
        genre = request.form['genre']
        publisher = request.form['publisher']

        feature_list = [year, na_sales, eu_sales, jp_sales, other_sales]

        # One-hot encoding for categorical variables
        platform_list = ['Other', 'PS2', 'PS3', 'X360']
        genre_list = ['Action', 'Other', 'Shooter', 'Sports']
        publisher_list = ['Electronic Arts', 'Nintendo', 'Other', 'Sony Computer Entertainment']

        def one_hot_encode(lst, value):
            for item in lst:
                feature_list.append(1 if item == value else 0)

        one_hot_encode(platform_list, platform)
        one_hot_encode(genre_list, genre)
        one_hot_encode(publisher_list, publisher)

        pred_value = prediction(feature_list)
        pred_value = np.round(pred_value[0], 2)

    return render_template('index.html', pred_value=pred_value)

if __name__ == '__main__':
    app.run(debug=True)
