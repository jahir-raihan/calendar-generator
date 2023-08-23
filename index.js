let current_date = new Date();
let months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function render_calendar(year){

    let calendar = ''

    // Iterating for 12 months
    for(var month = 0; month < 12; month++){
        
        let current_itr_month = new Date(year, month, 1).getMonth();
        var month_template = `
        <div class="month">
            <p class="year-month-name">${months_list[month]} - ${year}</p>

            <div class="week-day-names">
                <ul>
                    <li>Mo</li>
                    <li>Tu</li>
                    <li>We</li>
                    <li>Th</li>
                    <li>Fr</li>
                    <li>Sa</li>
                    <li>Su</li>
                </ul>
            </div>

            <div class="days">
                
        `
        let week_counter = 0;
        let first_week_itr = true;
        let week_list = [];
        let week_template = '<div class="week-days"><ul>';
        for(var day = 1; day < 32; day++){

            let current_loop_date = new Date(year, month, day);

            // If days goes out of range, break out of the loop and start next month
            if (current_itr_month !== current_loop_date.getMonth()){
                break
            } else {
                
                if(first_week_itr && current_loop_date.getDay() > 1){
                    
                    for (var tmp = 0; tmp < current_loop_date.getDay() - 1; tmp++){
                        week_template += `<li></li>`;
                        week_counter += 1;
                        
                    }
                   
                    
                } else if (first_week_itr && current_loop_date.getDay() === 0){
                
                    for (var tmp = 0; tmp < 6; tmp++){
                        week_template += `<li></li>`
                        week_counter += 1
                    }

                } else {
                    
                    if (week_counter % 7 === 0){
                        week_template += '</ul></div>'
                        month_template += week_template
                        week_template = '<div class="week-days"><ul>'
                        week_counter = 0

                    }
                }
                week_template += `<li>${day}</li>`
                week_counter += 1
                
            }
            first_week_itr = false

        }
        week_template += '</ul></div>'
        month_template += week_template + '</div></div>'
        calendar += month_template
        
    }
    document.getElementById('calender-container').innerHTML = calendar
    
}


// Initial Calendar Rendering
function calendar_init(year=null){
    if (year === null){
        year = current_date.getFullYear()
    } else{
        year = Number(document.getElementById('year-input').value)
    }
    render_calendar(year)
}
calendar_init()
