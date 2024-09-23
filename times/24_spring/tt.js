// 假设有两个表: orders和customers。orders表包含order_id, customer_id, order_date和order_amount字段。customers表包含customer_id, customer_name,和credit_limit字段。
// 1)查询所有在2023年之后下单且信用额度超过5000的客户的订单信息，包括订单ID、客户ID、客户名称、订单日期和信用额度。
// 2）查询每个客户的总订单金额，并只显示总订单金额超过1000的客户名称和总订单金额。
// 3)查询每个客户的订单数量，并按照订单数量降序排列，如果订单数量相同，则按照客户名称升序排列。
// 4）删除在2022年之前下单的所有订单。

// 1) SELECT o.order_id, o.customer_id, c.customer_name, o.order_date, c.credit_limit FROM orders o JOIN customers c ON o.customer_id = c.customer_id WHERE o.order_date > '2023-01-01' AND c.credit_limit > 5000;
// 2) SELECT c.customer_name, SUM(o.order_amount) AS total_order_amount FROM orders o JOIN customers c ON o.customer_id = c.customer_id GROUP BY c.customer_name HAVING total_order_amount > 1000;
// 3) SELECT c.customer_name, COUNT(o.order_id) AS total_order_count FROM orders o JOIN customers c ON o.customer_id = c.customer_id GROUP BY c.customer_name ORDER BY total_order_count DESC, c.customer_name ASC;
// 4) DELETE FROM orders WHERE order_date < '2022-01-01';


const promise = new Promise((resolve, reject) => {
    resolve('success');
    reject('error');
});

promise.then((value) => {
    console.log(value);
}, (error) => {
    console.log(error);
});


