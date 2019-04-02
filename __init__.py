from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route("/")
def home():
    # data = url_for('static', filename='kickstarter.csv')
    data = url_for('static', filename='test.csv')
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.debug = True
    app.run()
