// Class Based Approach

class Calendar {

  // Constructor method for initial setup of variables and values
  constructor (year) {
      this.year = year;
      this.months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.current_date = new Date();
      this.calendar = ''
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
              break
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
                      week_template += `<li class="empty-blocks"></li>`
                      week_counter += 1
                  }

              } else {
                  
                  // If a week is complete, start a new week container

                  if (week_counter % 7 === 0){
                      week_template += '</ul></div>'
                      month_template += week_template
                      week_template = '<div class="week-days"><ul>'
                      week_counter = 0

                  }
              }

              // If current iteration date is current local date mark it as active date.

              if (current_loop_date.getDate() == this.current_date.getDate() &&
                  current_loop_date.getMonth() === this.current_date.getMonth() &&
                  this.current_date.getFullYear() == current_loop_date.getFullYear()) {

                  week_template += `<li class="active"> ${day}</li>`

              } else {
                  week_template += `<li class="blocks">${day}</li>`
              }
              
              week_counter += 1
              
          }
          first_week_itr = false

      }
      week_template += '</ul></div>'
      month_template += week_template + '</div></div>'

      return month_template

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
      year = new Date().getFullYear()
  } else{
      year = Number(document.getElementById('year-input').value)
  }
    let calendar = new Calendar(year);
    document.getElementsByClassName('calender-header-year')[0].innerHTML = year;
  calendar.render_calendar()
}
calendar_init()


// download the calendar as a PDF using jsPDF library

function downloadAsPDF() {
    window.jsPDF = window.jspdf.jsPDF;

   let calendar = document.getElementById("calender-container");
   let calendar_months = document.querySelectorAll(".year-month-name");
   
    // remove the active background
    let active_month = document.querySelector(".active");
    active_month.style.background = "none";

   for (const calendar_month of calendar_months) {
    calendar_month.style.color = "#343a40";
    calendar_month.style.fontSize = "20px";
    calendar_month.style.textAlign = "left";
   }

    // first convert the page to an image
   html2canvas(calendar).then((canvas) => {
        
    // convert this canvas to a PDF
    const dataURL = canvas.toDataURL('image/jpeg');

    let doc = new jsPDF({orientation: 'p'});
    doc.addImage(dataURL, 'JPEG', 12, 20, 180, 180);
    doc.save('calendar.pdf');
    });

    //clear the style for the year-month-name class
    calendar_months.forEach((cm) => {
        cm.style.color = "white";
        cm.style.fontSize = "13px";
        cm.style.textAlign = "left";
    })

    // return the background color for the active class
    active_month.style.background = "#343a40";



}

// Function Based Approach

// let current_date = new Date();
// let months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// function render_calendar(year){

//     let calendar = ''

//     // Iterating for 12 months
//     for(var month = 0; month < 12; month++){
      
//         let current_itr_month = new Date(year, month, 1).getMonth();
//         var month_template = `
//         <div class="month">
//             <p class="year-month-name">${months_list[month]} - ${year}</p>

//             <div class="week-day-names">
//                 <ul>
//                     <li>Mo</li>
//                     <li>Tu</li>
//                     <li>We</li>
//                     <li>Th</li>
//                     <li>Fr</li>
//                     <li>Sa</li>
//                     <li>Su</li>
//                 </ul>
//             </div>

//             <div class="days">
              
//         `
//         let week_counter = 0;
//         let first_week_itr = true;
//         let week_template = '<div class="week-days"><ul>';
//         for(var day = 1; day < 32; day++){

//             let current_loop_date = new Date(year, month, day);

//             // If days goes out of range, break out of the loop and start next month
//             if (current_itr_month !== current_loop_date.getMonth()){
//                 break
//             } else {
              
//                 if(first_week_itr && current_loop_date.getDay() > 1){
                  
//                     for (var tmp = 0; tmp < current_loop_date.getDay() - 1; tmp++){
//                         week_template += `<li></li>`;
//                         week_counter += 1;
                      
//                     }
                 
                  
//                 } else if (first_week_itr && current_loop_date.getDay() === 0){
              
//                     for (var tmp = 0; tmp < 6; tmp++){
//                         week_template += `<li></li>`
//                         week_counter += 1
//                     }

//                 } else {
                  
//                     if (week_counter % 7 === 0){
//                         week_template += '</ul></div>'
//                         month_template += week_template
//                         week_template = '<div class="week-days"><ul>'
//                         week_counter = 0

//                     }
//                 }
//                 if (current_loop_date.getDate() == current_date.getDate() &&
//                     current_loop_date.getMonth() === current_date.getMonth() &&
//                     current_date.getFullYear() == current_loop_date.getFullYear()) {

//                     week_template += `<li class="active"> ${day}</li>`

//                 } else {
//                     week_template += `<li>${day}</li>`
//                 }
              
//                 week_counter += 1
              
//             }
//             first_week_itr = false

//         }
//         week_template += '</ul></div>'
//         month_template += week_template + '</div></div>'
//         calendar += month_template
      
//     }
//     document.getElementById('calender-container').innerHTML = calendar
  
// }


// // Initial Calendar Rendering
// function calendar_init(year=null){
//     if (year === null){
//         year = current_date.getFullYear()
//     } else{
//         year = Number(document.getElementById('year-input').value)
//     }
//     render_calendar(year)
// }
// calendar_init() -> Function Based Renderer call
