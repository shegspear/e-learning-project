console.log('Runing Tutorial page JS app');

// CODE MODULE TO HANDLE LOGIC
const Model = (function() {

    return{
        checkme: function() {
          console.log('model module');
        }
    }
})();

// CODE MODULE TO HANDLE USER INTERFACE
const UI = (function() {
    // VARIABLE HOLDING ALL SELECTORS FROM THE UI
    let uiSelectors = {
        universalDiv: '.universe',
       oldCourseLayer: '.courses-layer',
       newCourseLayer: '.new-course-layer',
       courseBtn: '.course-btn',
    }

    // PUBLIC METHODS
    return{
        checkme: function() {
          console.log('ui module');
        },

        getUiSelectors: function() {
            return uiSelectors;
        },

        createContainer: function(currentCourse) {
            // console.log('UI level: ', currentCourse);

            function layFoundationEn(obj) {
                let div = document.createElement('div');
                let title = document.createElement('h1');
                let subTitle1 = document.createElement('h3');
                let head = document.createElement('p');

                let titleText = document.createTextNode(obj.courseTitle);
                let subTitle1Text = document.createTextNode(obj.subCoursesTitle[0]);
                let headText = document.createTextNode(obj.subCourseOne.subTopicOne.head);

                div.className = 'course2';
                title.className = 'h2';
                subTitle1.className ='h3 m-3';
                head.className = 'p m-3';
                
                head.append(headText)
                subTitle1.append(subTitle1Text)
                title.append(titleText)

                div.append(title, subTitle1, head)
    
                document.querySelector(uiSelectors.newCourseLayer).append(div);
            };

            if(currentCourse.courseTitle == "Language-English-French") {
               layFoundationEn(currentCourse)
            }

        }
    }
})();


// CODE MODULE TO HANDLE STORAGE
const Database = (function(UI) {
    
    const Data = {
        myCourse: null
    };

    // GET DATA FROM DATA BASE
    function fetchData(course) {
        async function getCourses() {
            const res = await fetch(`https://infinite-temple-07771.herokuapp.com/courses`);
            const data = await res.json();
            return data;
        }

        getCourses().then(data => {
            data.forEach((cur) => {
                if(cur.courseTitle == course) {
                    // console.log(course);
                    Data.myCourse = cur;
                    console.log('Your new course: ', Data.myCourse);
                    UI.createContainer(Data.myCourse);
                } else {
                    console.log('No match');
                }
                
            })
        });

        
    };
   
    // PUBLIC METHODS
    return{
       getData: function(course) {
            fetchData(course);
       },
       
       getCurrentCourse: function() {
           
       }
    }
})(UI);

// CODE MODULE TO CONTROL OTHER MODULES
const Controller =(function(UI, Model, Database) {
    // GET SELECTORS FROM THE UI MODULE
    var uiSelector = UI.getUiSelectors();

    const loadEventListners = function() {
        
        document.querySelectorAll(uiSelector.courseBtn).forEach((cur) => {
           cur.addEventListener('click', changeCourse);
        });

    };

    const changeCourse = function(e) {
        e.preventDefault();

        let pin = e.target.classList;
        let course = pin[1];
        
        document.querySelector(uiSelector.oldCourseLayer).style.display = 'none';

         Database.getData(course);
        let currentCourse = Database.getCurrentCourse();
    };

    return{
        init: function() {
           loadEventListners();
        }
    }
})(UI, Model, Database);

Controller.init();