# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#

tasks = Task.create([{
	title: 'How to cook',
	description: 'Learn how to cook'
}, {
	title: 'Creating a RESTful API with Rails',
	description: 'a long content in here'
}])

