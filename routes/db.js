const AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: 'AKIAI76E52ABXMWPH4RQ', 
	secretAccessKey: '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', 
	"region": 'us-east-1'
});


const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const uuid = require('node-uuid');

const tableName = 'Library';

module.exports.update = (key, obj, cb) => {
	let params = {
		TableName: tableName,
		Key: key,
		UpdateExpression: 'set num = :a, borrower = :b',
		ExpressionAttributeValues: {
			':a': obj.num,
			':b': obj.borrower
		},
		ReturnValues: "UPDATED_NEW"
	};

	docClient.update(params, cb);
}

module.exports.get = (key, cb) => {
	let params = {
		TableName: tableName,
		Key: { ID: key.ID }
	}
	docClient.get(params, cb);
}

module.exports.put = (obj) => {
	let params = {
		TableName: tableName,
		Item: {
			ID: obj.ID,
			author: obj.author,
			borrower: {},
			lang: obj.lang,
			num: obj.num,
			title: obj.title
		}
	};

	docClient.put(params, (err, data) => {
		if (err) { console.error(err); }
	});
}

module.exports.getAll = (cb) => {
	let params = {
		TableName: tableName,
		ProjectionExpression: 'ID, author, lang, num, title'
	};
	docClient.scan(params, cb);
}

module.exports.search = (obj, cb) => {
	if(obj.author != "" && obj.lang != "any") {
		filterExpression = '(contains(title, :title) and contains(author, :author) and lang=:lang';
		expressionAttributeValues = {
			":title": obj.title,
			":author": obj.author,
			":lang": obj.lang
		};
	}
	else if(obj.author != "" && obj.lang == "any") {
		filterExpression = 'contains(title, :title) and contains(author, :author)';
		expressionAttributeValues = {
			":title": obj.title,
			":author": obj.author
		};
	}	
	else if(obj.author == "" && obj.lang != "any") {
		filterExpression = 'contains(title, :title) and lang=:lang';
		expressionAttributeValues = {
			":title": obj.title,
			":lang": obj.lang
		};
	}	
	else {
		filterExpression = 'contains(title, :title)';
		expressionAttributeValues = {
			":title": obj.title
		};
	}
	let params = {
		TableName: tableName,
		ProjectionExpression: 'ID, author, lang, num, title',
		FilterExpression: filterExpression,
		ExpressionAttributeValues: expressionAttributeValues
	};

	docClient.scan(params, cb);
}