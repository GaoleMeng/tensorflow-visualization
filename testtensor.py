# import tensorflow as tf;
#
# matrix1 = tf.constant([[3., 3.]]);
# matrix2 = tf.constant([[2.],[2.]]);
#
# product = tf.matmul(matrix1, matrix2);
#
# with tf.Session() as sess:
#   result = sess.run([product])
#   print(result)
#

# t = tf.constant([[1, 2, 3], [1, 123, 2], [5, 8, 9], [2, 3, 4]])
# sess = tf.Session()
#
# print sess.run(tf.shape(t))
# print sess.run(tf.size(t))
# print sess.run(tf.rank(t))
#

# # import tensorflow as tf;
# #
# # node1 = tf.constant(3.0, tf.float32)
# # node2 = tf.constant(4.0) # also tf.float32 implicitly
# # print(node1, node2)
# #
# #
# # sess = tf.Session();
# #
# # print(sess.run([node1, node2]));
# #
# # node3 = tf.add(node1, node2);
# # print("node3: ", node3);
# # print("sess.run(node3): ", sess.run(node3));
# #
# #
# # a = tf.placeholder(tf.float32);
# # b = tf.placeholder(tf.float32);
# # adder_node = a + b;
# #
# #
# # print(sess.run(adder_node, {a:3, b:4.5}));
# # print(sess.run(adder_node, {a: [1, 3], b:[2, 4]}));
# #
# # add_node_triple = adder_node*3;
# # print(sess.run(add_node_triple, {a:3, b:5.5}));
# #
# # W = tf.Variable([-1.], tf.float32)
# # b = tf.Variable([1.], tf.float32)
# # x = tf.placeholder(tf.float32)
# # linear_model = W * x + b
# #
# #
# # init = tf.global_variables_initializer()
# # sess.run(init)
# #
# # print(sess.run(linear_model, {x:[1,2,3,4]}));
# #
# # y = tf.placeholder(tf.float32)
# # squared_deltas = tf.square(linear_model - y)
# # loss = tf.reduce_sum(squared_deltas)
# # print(sess.run(loss, {x:[1,2,3,4], y:[0,-1,-2,-3]}))
# #
# # optimizer = tf.train.GradientDescentOptimizer(0.01)
# # train = optimizer.minimize(loss)
# #
# # sess.run(init) # reset values to incorrect defaults.
# # for i in range(1000):
# #   sess.run(train, {x:[1,2,3,4], y:[0,-1,-2,-3]})
# # print(sess.run([W, b]))
# #
# #
# # # Model parameters
# # W = tf.Variable([.3], tf.float32)
# # b = tf.Variable([-.3], tf.float32)
# # # Model input and output
# # x = tf.placeholder(tf.float32)
# # linear_model = W * x + b
# # y = tf.placeholder(tf.float32)
# # # loss
# # loss = tf.reduce_sum(tf.square(linear_model - y)) # sum of the squares
# # # optimizer
# # optimizer = tf.train.GradientDescentOptimizer(0.01)
# # train = optimizer.minimize(loss)
# # # training data
# # x_train = [1,2,3,4]
# # y_train = [0,-1,-2,-3]
# # # training loop
# # init = tf.global_variables_initializer()
# # sess.run(init) # reset values to wrong
# # for i in range(1000):
# #   sess.run(train, {x:x_train, y:y_train})
# # # evaluate training accuracy
# # curr_W, curr_b, curr_loss  = sess.run([W, b, loss], {x:x_train, y:y_train})
# # print("W: %s b: %s loss: %s"%(curr_W, curr_b, curr_loss))
#
import numpy as np
import tensorflow as tf
# Declare list of features, we only have one real-valued feature
features = [tf.contrib.layers.real_valued_column("", dimension=1)]
def model(features, labels, mode, params):
  with tf.device("/cpu:0"):
    # Build a linear model and predict values
    W = tf.get_variable("W", [1], dtype=tf.float64)
    b = tf.get_variable("b", [1], dtype=tf.float64)
    y = W*features[:,0] + b
    # Loss sub-graph
    loss = tf.reduce_sum(tf.square(y - labels))
    # Training sub-graph
    global_step = tf.train.get_global_step()
    optimizer = tf.train.GradientDescentOptimizer(0.01)
    train = tf.group(optimizer.minimize(loss),
                     tf.assign_add(global_step, 1))
    # ModelFnOps connects subgraphs we built to the
    # appropriate functionality.
    return tf.contrib.learn.estimators.model_fn.ModelFnOps(
        mode=mode, predictions=y,
        loss= loss,
        train_op=train)
estimator = tf.contrib.learn.Estimator(model_fn=model)
# define our data set
dataSet = tf.contrib.learn.datasets.base.Dataset(
   data=np.array([[1.],[2.],[3.],[4.]]),
   target=np.array([[0.],[-1.],[-2.],[-3.]]))
# train
estimator.fit(x=dataSet.data, y=dataSet.target, steps=1000)
# evaluate our model
print(estimator.evaluate(x=dataSet.data, y=dataSet.target, steps=10))
