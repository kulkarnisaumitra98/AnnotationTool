content = '{% load static %} '
with open('index.html', 'r') as file:
	content += file.read()

content = content.replace('/static/', '{% static "basic_app/')
content = content.replace('.js"', '.js" %}"')
	
with open('index.html', 'w') as file:
	file.write(content)
