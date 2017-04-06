import tensorflow as tf;
import numpy as np;
import json;

x_data = np.random.rand(1000).astype(np.float32);
y_data = x_data*0.1 + 0.3;
z_data = np.zeros(1000).astype(np.float32);


data = {};


for i, line in enumerate(open("out.txt")):
	vec = line.strip().split(" ");
	if i != 0:
		data[i-1] = {'x': float(vec[0]), 'y': float(vec[1]), 'z': float(vec[2])}



for i, line in enumerate(open("labelfile.txt")):
	vec = line.strip().split(" ");
	data[i]["label"]=str(vec[0])

json.dump(data, open('static/data.json', 'w'));




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
