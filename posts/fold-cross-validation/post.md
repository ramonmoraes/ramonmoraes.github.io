# Fold Cross Validation, a good idea

We already know how hard is to obtain a good dataset, a balanced one is even harder.

In this article I'll explain in a pratical and simple way why fold cross validation is a good idea to further improve your ml models using the dataset you already have.

For this example, let's first import one dataset and check one small sample of it


```python
from sklearn import datasets

iris = datasets.load_iris()

features_amount = 3
dataset = {
    "features": iris.data[:,:features_amount],
    "target": iris.target
}

from pandas import DataFrame
DataFrame(
    data=dataset['features'][:5],
    columns=iris['feature_names'][:features_amount]
)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sepal length (cm)</th>
      <th>sepal width (cm)</th>
      <th>petal length (cm)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
    </tr>
  </tbody>
</table>
</div>



Usually, in guides/tutorials it's a common saying that the database should be splited in 80:20, 80% for training the model and 20% for testing it against. As I've done it bellow


```python
total_len = len(dataset['features'])
eighty_percet = int(total_len*0.8)

training = {
    "features": dataset['features'][:eighty_percet],
    "target": dataset['target'][:eighty_percet]
}

test = {
    "features": dataset['features'][eighty_percet:],
    "target": dataset['target'][eighty_percet:]
}

```

After splitting, I'll use a Logistic Regression model to classify the dataset


```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(training['features'], training['target'])

print(f"test score: {model.score(test['features'], test['target'])}")
print(f"training score: {model.score(training['features'], training['target'])}")
```

    test score: 0.7
    training score: 0.9666666666666667


From this initial split, we've got score of 70% against this testing split.

But how can we know which part of the dataset would yield an better result?
What if the first 20% features would result in a better testing split
instead of the last 20%?

To test it, there's a tecnique called **fold-cross validation**, which divide your dataset in randonly splits for the chosen size;

In the test bellow, I'll make a *ten fold cross validation*, meaning that will be created unique 10 folds.

I will also stores the score for later comparission


```python
from sklearn.model_selection import train_test_split

train_scores = []
test_scores = []

for i in range(10):
    features_train, features_test, target_train, target_test = train_test_split(
        dataset['features'],
        dataset['target'],
        train_size=0.2 # How many percents will be destined to train split
    )

    model = LogisticRegression()
    model.fit(features_train, target_train)
    
    train_scores.append(model.score(features_train, target_train))
    test_scores.append(model.score(features_test, target_test))

```

Now let's analyze the created trained models and their scores, and check if this theory worked


```python
from numpy import mean
print(f"train score = {mean(train_scores)}")
print(f"test score = {mean(test_scores)}")
```

    train score = 0.9333333333333333
    test score = 0.9058333333333334


Just for the score's mean we've got a better already result!

The test score went up approximately 20% and the train score also got less overfited!

But let's also check them individually


```python
DataFrame(data=zip(test_scores, train_scores), columns=["test score", "train score"])
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>test score</th>
      <th>train score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.933333</td>
      <td>0.866667</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.933333</td>
      <td>0.966667</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.941667</td>
      <td>0.966667</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.858333</td>
      <td>0.866667</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.883333</td>
      <td>0.966667</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.933333</td>
      <td>0.900000</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.925000</td>
      <td>0.966667</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.850000</td>
      <td>0.966667</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.900000</td>
      <td>0.933333</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.900000</td>
      <td>0.933333</td>
    </tr>
  </tbody>
</table>
</div>



As expected the results were pretty good, every one of them were better them the initial %20 one, when the split were chosen whithin the dataset order.

So if you are using a manual split in your models I suggest using this fold cross validation to prevent some inbalance whithin your dataset

