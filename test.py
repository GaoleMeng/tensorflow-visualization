import tensorflow as tf;
import numpy as np;
import json;

x_data = np.random.rand(1000).astype(np.float32);
y_data = x_data*0.1 + 0.3;

data = {};

for i in range(100):
    data[i] = {'x': x_data[i].item(), 'y': y_data[i].item()};

json.dump(data, open('data/data.json', 'w'));


#print(json.dumps(x_data.tolist(), open('data/data.json', 'w')));


# Weights = tf.Variable(tf.random_uniform([1], -1.0, 1.0))
# biases = tf.Variable(tf.zeros([1]));
#
# y = Weights * x_data+ biases;
# loss = tf.reduce_mean(tf.square(y-y_data));
# optimizer = tf.train.GradientDescentOptimizer(0.5)
# train = optimizer.minimize(loss);
#
# init = tf.initialize_all_variables();
#
# sess = tf.Session();
# sess.run(init);
#
# for step in range(201):
#     sess.run(train);
#     if step % 20==0:
#         print(step, sess.run(Weights), sess.run(biases));
