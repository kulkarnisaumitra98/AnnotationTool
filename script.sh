expo build:web;

# app_path="~/PycharmProjects/genderBiasApp/highlighter/basic_app"

rm -r ~/PycharmProjects/genderBiasApp/highlighter/basic_app/static/basic_app/js/*
cp ./web-build/static/js/*.js ~/PycharmProjects/genderBiasApp/highlighter/basic_app/static/basic_app/js/
cp ./web-build/index.html .
python3 replace.py
cp index.html ~/PycharmProjects/genderBiasApp/highlighter/basic_app/templates/basic_app/
rm index.html