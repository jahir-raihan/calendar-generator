//  Weekend validator.

function verfiy_weekend(date, time_zone){
    if (time_zone === 'Asia/Dhaka' && (date === 4 || date === 5)) {
        return true
    }

}


// Class Based Approach

class Calendar {

    // Constructor method for initial setup of variables and values
    constructor (year) {
        this.year = year;
        this.months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.current_date = new Date();
        this.calendar = '';
        this.time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    // Weekend validator -> Add your timezone validator to mark your region weekends on the calendar
    verfiy_weekend(date, time_zone){

        // Here 0 is Monday and 6 is Sunday

        if (time_zone === 'Asia/Dhaka' && (date === 4 || date === 5)) {
            return true
        }

    }


    // Months iterator for iterating over months, [January - December].
    months_iterator () {

        for(var month = 0; month < 12; month++){

            let current_itr_month = new Date(this.year, month, 1).getMonth();

            // At every iteration, it adds a new month to calender by calling weeks_iterator.
            this.calendar += this.weeks_iterator(month, current_itr_month);
        }
        
        
    }


    // Iterates for a whole month by dividing days into week, and returns completed month template
    weeks_iterator (month, current_itr_month) {

        /* The idea behind this scenario was simple, if we divide the month into week sub section
            We will get what we needed. Also  complexity arises when the day of the week starts from a 
            different day, for example, Januray 1, 2023 starts at Sunday, in that case are just filling up rest of 
            the weekdays with empty <li> elements. Also if we reach a count of 7 days, we are
            adding a new week container to the month template. */

        
        // Initial variables
        var month_template = `<div class="month"><p class="year-month-name">${this.months_list[month]} - ${this.year}</p><div class="week-day-names">
                            <ul><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li><li>Su</li></ul></div><div class="days">
        `
        let week_counter = 0;
        let first_week_itr = true;
        let week_template = '<div class="week-days"><ul>';


        // Loop through the month
        for(var day = 1; day < 32; day++){

            let current_loop_date = new Date(this.year, month, day);

            // If days goes out of range, break out of the loop and start next month
            if (current_itr_month !== current_loop_date.getMonth()){
                break;
            } else {
                
                // If first day of the month starts from other weekdays rather then Monday,
                // fill up days with empty <li> elements until reaches current week day.

                if(first_week_itr && current_loop_date.getDay() > 1){
                    
                    for (var tmp = 0; tmp < current_loop_date.getDay() - 1; tmp++){
                        week_template += `<li class="empty-blocks"></li>`;
                        week_counter += 1;
                        
                    }
                    
                    
                } else if (first_week_itr && current_loop_date.getDay() === 0){

                    // If first day of the month starts from Sunday fill up all the weekdays
                    // except Sunday with empty <li> elements.
                
                    for (var tmp = 0; tmp < 6; tmp++){
                        week_template += `<li class="empty-blocks"></li>`;
                        week_counter += 1;
                    }

                } else {
                    
                    // If a week is complete, start a new week container

                    if (week_counter % 7 === 0){
                        week_template += '</ul></div>';
                        month_template += week_template;
                        week_template = '<div class="week-days"><ul>';
                        week_counter = 0;

                    }
                }

                // If current iteration date is current local date mark it as active date.

                if (current_loop_date.getDate() == this.current_date.getDate() &&
                    current_loop_date.getMonth() === this.current_date.getMonth() &&
                    this.current_date.getFullYear() == current_loop_date.getFullYear()) {
                
                    if (this.verfiy_weekend(week_counter, this.time_zone)){

                        week_template += `<li class="weekend-current-date " id='active'><p>${day}</p></li>`;

                    } else {

                        week_template += `<li class="active" id='active'><p>${day}</p></li>`;

                    }
                    

                } else {
                    if (this.verfiy_weekend(week_counter, this.time_zone)){

                        week_template += `<li class="blocks weekend-color"><p>${day}</p></li>`;
                
                    } else {

                        week_template += `<li class="blocks"><p>${day}</p></li>`;
                    }
                    
                }
                
                week_counter += 1;
                
            }
            first_week_itr = false;

        }
        week_template += '</ul></div>';
        month_template += week_template + '</div></div>';

        return month_template;

    }

    // Renderer method 
    render_calendar () {

        this.months_iterator();
        document.getElementById('calender-container').innerHTML = this.calendar

        return this.calendar;
    }

}

// Renderer call - Class Based

function calendar_init(year = null) {

    if (year === null){
        year = new Date().getFullYear();
    } else{
        year = Number(document.getElementById('year-input').value);
    }
    let calendar = new Calendar(year);
    document.getElementsByClassName('calender-header-year')[0].innerHTML = year;
    document.getElementById('title').innerHTML = `Calendar - ${year}`
    calendar.render_calendar();
}
calendar_init()


// download the calendar as a PDF using jsPDF library

function download_calendar() {
    
    document.getElementById('header').style.display = 'none'
    document.getElementById('search-selected-year-download').style.display = 'none'
    document.getElementById('calender-header').style.marginTop = '1.5em'
    let current_year = document.getElementsByClassName('calender-header-year')[0].innerHTML
    document.getElementsByClassName('calender-header-year')[0].innerHTML = `Calendar - ${current_year}`
    try{
        document.getElementById('active').classList.remove('active')
        document.getElementById('active').classList.remove('weekend-current-date')
    }catch{}
    
    document.getElementById('calender-container').style.marginTop = '1.5em'
    
    window.print();

    location.reload()
    

}
