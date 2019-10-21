# Doodle Classifier

This example relies on the supervised learning concept and uses the [Google QuickDraw dataset][1] for training and testing data. The core idea is to classify a doodle the user draws within one of the categories available.

## How to use it

For getting it ready to be used, first you'll need to follow the steps described in the home [README file][2].

Next, with the example runnning, you'll see that a list of categories are exhibited aside from the canvas. After marking the categories you'd like to work with, you may either train or test the machine learning by clicking on the buttons.

When you want to, you might draw something in the canvas and click on the guess button to have the machine predict what you just drew. 

## Directory and files organization

The files are organized as follows.

- [index.html](./index.html) - HTML file that includes the p5 library and other files into the page and creates some visual controllers for configuration.
- [sketch.js](./sketch.js) - Entry point for executing the example. This is were the [DoodleClassifier](./lib/doodle-classifier.js) is instanciated.
- [lib/](./lib) - Libraries that were built for abstracting processes.
    * [matrix.js](./lib/matrix.js) - Implementation for matrix basic operation for making it easier to doing back-propagation and feed-forward operations
    * [nn.js](./lib/nn.js) - My fully connected neural network implementation.
    * [doodle-classifier.js](./lib/doodle-classifier.js) - Class for handling the neural network manipulation for classifying the given doodle, and for training and testing it.
- [data/](./data) - Categories raw data used for training and testing.
- [loadbinary.js](./loadbinary.js) - Library used for adding a easier way to load binary files

## Contribuition

If you find any bug or have any suggestion, create an issue or a pull request.

[Go Back](../README.md)

[1]: https://quickdraw.withgoogle.com/data
[2]: ../README.md