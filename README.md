# Machine Learning basics

This repository contains examples with basic machine learning structures and it's been built for learning purposes.

## Where it was inspired from

The examples available in this repository were produced following the [Daniel Shiffman YouTube videos][10].

## How to run the examples

First, you'll need to install the [Node Package Manager][1]. If you're in a Linux environment that uses apt-get, you can install it by executing the following command on the terminal.

```sh
    sudo apt-get install npm
```
Then, you'll need to install the [p5-manager package][2]. To do so, run the following.

```sh
    sudo npm i -g p5-manager
```
Finally, you'll need to start the p5 server by executing

```sh
    p5 server
```

The server is now running, and you're able to see the examples in the address provided by the previous command (which is, by default, http://localhost:5555).

## Available Examples

- [Linear Regression][20]
- [Linear Regression with Gradient Descent][21]
- [Perceptron][22]
- [Neural Network library][23]
- [Movie Recommendation][24]
- [Doodle Classifier][25]


## Contribuitions

If you find any mistakes or want to improve the code, you can create a pull request and it may be integrated to the repository.

[1]: https://www.npmjs.com
[2]: https://www.npmjs.com/package/p5-manager
[10]: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw
[20]: ./linear-regression/README.md
[21]: ./linear-regression-gradient-descent/README.md
[22]: ./perceptron/README.md
[23]: ./neural-network/README.md
[24]: ./movie-recommendation/README.md
[25]: ./doodle-classifier/README.md