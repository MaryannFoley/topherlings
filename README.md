## Topherlings
### Maryann Foley (PM), Joan Chirinos, Mohtasim Howlader, Joyce Liao

#### Data Set
[Kickstarter Projects](https://www.kaggle.com/kemical/kickstarter-projects?fbclid=IwAR0sQs_2IuO4t7lyr1MAzcyX0GSQym-lK5mL14QNL-RFD3EXtOL8Bq1rfjQ): 
Data on kickstarter projects since the launch of kickstarter in 2009 till 2018. There is information provided about project categories, goals, and funding. Kickstarter has been a very effective tool in the creation of new products that allows consumers to invest directly in the products they want.  We wanted to use this data to see what types of projects are the most commonly created and which are the most funded.
#### Data Visualization
* Kickstarter projects are grouped by categories from which the user can choose to explore in further detail
* Projects in their respective categories are ranked according to different factors such as amount of money pledged, number of backers, etc
* Projects are sorted by main categories, and then subcategories
* Mean rate of successfully launching a project in each subcategory is calculated
##### User Interaction
* Users can navigate through different aspects (funding, num of backers, etc) by clicking on each tab at the top of the page
* Size of circles change depending on the aspects that the users choose
* Users click on a specific category to view its projects
* Users can access information about individual projects including their names, funding, and backers
* Our model will help users to determine which type(s) of campaigns receive the most support and/or are most likely to be successful and to explore what contributes to those trends if there are any

#### D3 Application
* Data are attached to color-coded circle elements, similar to the [Obama Budget Proposal](https://archive.nytimes.com/www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html?fbclid=IwAR1Xz3EraH55cscQreC9mkNw3XD3VDGyAjF-7q5Yju2DwEgy1S7_SLkOpsA) example
* Dynamic sizing and arrangement to reflect relative values
* Data presented as [basic bubble charts](https://observablehq.com/@d3/bubble-chart) or [zoomable bubble charts](https://observablehq.com/@d3/zoomable-circle-packing) if time allows

### Launch Instructions
1. Go to [root repository](https://github.com/MaryannFoley/topherlings) and click "Clone or Download" button
2. Copy the ssh/https link and run `$ git clone <link>`
3. Make sure the latest version of Python (currently Python 3.7.1) is installed. If not, download it [here](https://www.python.org/downloads/).
4. Install virtualenv by running `$ pip install virtualenv`
   * Make a venv by running `$ python3 -m venv ENV_DIR`
   * Activate it by running `$ . /ENV_DIR/bin/activate`
   * Deactivate it by running `$ deactivate`
5. Install Flask and wheel with `$ pip install flask` and `$ pip install wheel` (this is a Flask application)
6. Make sure virtual enviornment is activated
7. Run `$ python app.py`
8. Launch the root route (http://127.0.0.1:5000/) in your browser to go to the login page.
