
        //script for index in home to start on 1, not on 0.
        var divs = document.querySelectorAll('.create_index');
        var i = 0;
        for (i; i < divs.length; ++i) {
            divs[i].innerHTML = i + 1;
        }

        divs[i].innerHTML = 0;

        //script for accepting number only in contact number.
        function validate(evt) {
            var theEvent = evt || window.event;

            // Handle paste
            if (theEvent.type === 'paste') {
                key = event.clipboardData.getData('text/plain');
            } else {
                // Handle key press
                var key = theEvent.keyCode || theEvent.which;
                key = String.fromCharCode(key);
            }
            var regex = /[0-9]|\./;
            if (!regex.test(key)) {
                theEvent.returnValue = false;
                if (theEvent.preventDefault) theEvent.preventDefault();
            }
        }

        // script for searching
        function myFunction() {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[2];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        ///////////////////////////////////// FOR LEAVE ENTRY MODULE ////////////////////////////////////
        // script for searching leave
        function myFunctionLeave() {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInputleave");
            filter = input.value.toUpperCase();
            table = document.getElementById("leave_table");
            tr = table.getElementsByTagName("tr");
            sumVal = 0;

            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        sumVal = sumVal + parseInt(table.rows[i].cells[8].innerHTML);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
            document.getElementById("val").innerHTML = "Total Leave = " + sumVal;
        }

        // script for searching leave summary
        function myFunctionLeaveSummary() {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInputleave");
            filter = input.value.toUpperCase();
            table = document.getElementById("leave_table_summary");
            tr = table.getElementsByTagName("tr");
            sumVal = 0;

            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        sumVal = sumVal + parseInt(table.rows[i].cells[6].innerHTML);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
            document.getElementById("val").innerHTML = "Total Leave = " + sumVal;
        }

        ///////////////////////////////// FOR JO CONTRIBUTION MODULE ////////////////////////////////////
        // script for searching CONTRI
        function myFunctionContri() {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInputContri");
            filter = input.value.toUpperCase();
            table = document.getElementById("contri_table");
            tr = table.getElementsByTagName("tr");
            sumVal = 0;

            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        sumVal = sumVal + parseInt(table.rows[i].cells[8].innerHTML);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
            document.getElementById("val").innerHTML = "Total Contribution = " + sumVal;
        }

        // script for searching leave summary
        function myFunctionContriSummary() {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInputContriSummary");
            filter = input.value.toUpperCase();
            table = document.getElementById("contri_table_summary");
            tr = table.getElementsByTagName("tr");
            sumVal = 0;

            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                }
            });

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        sumVal = sumVal + parseInt(table.rows[i].cells[5].innerHTML);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
            document.getElementById("val").innerHTML = "Total Contribution = " + sumVal;
        }


        //selecting id in employee modal
        function showTableData() {
            if (!document.getElementsByTagName || !document.createTextNode) return;
            var rows = document.getElementById('myTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
            for (i = 0; i < rows.length; i++) {
                rows[i].onclick = function () {
                    var empl_id = document.getElementById("employee_id");
                    var empl_fullname = document.getElementById("empl_fullname");
                    var empl_position = document.getElementById("empl_position");
                    var empl_apointment = document.getElementById("empl_apointment");

                    //alert(this.rowIndex);
                    empl_id.value = this.cells[1].innerHTML;
                    empl_fullname.value = this.cells[2].innerHTML;
                    empl_position.value = this.cells[3].innerHTML;
                    empl_apointment.value = this.cells[4].innerHTML;
                }
            }

        }

        function getBusinessDateCount(startDate, endDate) {
            var elapsed, daysBeforeFirstSaturday, daysAfterLastSunday;
            var ifThen = function (a, b, c) {
                return a == b ? c : a;
            };

            elapsed = endDate - startDate;
            elapsed /= 86400000;

            daysBeforeFirstSunday = (7 - startDate.getDay()) % 7;
            daysAfterLastSunday = endDate.getDay();

            elapsed -= (daysBeforeFirstSunday + daysAfterLastSunday);
            elapsed = (elapsed / 7) * 5;
            elapsed += ifThen(daysBeforeFirstSunday - 1, -1, 0) + ifThen(daysAfterLastSunday, 6, 5);

            return Math.ceil(elapsed);
        }

        function calc() {
            let start = document.querySelector('#leave_start').value,
                end = document.querySelector('#leave_end').value,
                result = getBusinessDateCount(new Date(start), new Date(end));
            document.querySelector('#num_days').value = result;
        }

        var index;      // cell index
        var toggleBool; // sorting asc, desc 
        function sorting(tbody, index) {
            this.index = index;
            if (toggleBool) {
                toggleBool = false;
            } else {
                toggleBool = true;
            }

            var datas = new Array();
            var tbodyLength = tbody.rows.length;
            for (var i = 0; i < tbodyLength; i++) {
                datas[i] = tbody.rows[i];
            }

            // sort by cell[index] 
            datas.sort(compareCells);
            for (var i = 0; i < tbody.rows.length; i++) {
                // rearrange table rows by sorted rows
                tbody.appendChild(datas[i]);
            }
        }

        function compareCells(a, b) {
            var aVal = a.cells[index].innerText;
            var bVal = b.cells[index].innerText;

            aVal = aVal.replace(/\,/g, '');
            bVal = bVal.replace(/\,/g, '');

            if (toggleBool) {
                var temp = aVal;
                aVal = bVal;
                bVal = temp;
            }

            if (aVal.match(/^[0-9]+$/) && bVal.match(/^[0-9]+$/)) {
                return parseFloat(aVal) - parseFloat(bVal);
            }
            else {
                if (aVal < bVal) {
                    return -1;
                } else if (aVal > bVal) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }

        //script for putting a total or sum in a table
        var table = document.getElementById("employee_table"), sumVal = 0;

        for (var i = 1; i < table.rows.length; i++) {
            sumVal = sumVal + 1;
        }
        document.getElementById("val").innerHTML = "Total Employee/s = " + sumVal;

        //script for putting a total or sum in a table
        var table = document.getElementById("leave_table_summary"), sumVal = 0;

        for (var i = 1; i < table.rows.length; i++) {
            sumVal = sumVal + parseInt(table.rows[i].cells[6].innerHTML);
        }
        document.getElementById("val").innerHTML = "Total Leave = " + sumVal;

        //script for putting a total or sum in a table
        var table = document.getElementById("leave_table"), sumVal = 0;

        for (var i = 1; i < table.rows.length; i++) {
            sumVal = sumVal + parseInt(table.rows[i].cells[8].innerHTML);
        }
        document.getElementById("val").innerHTML = "Total Leave = " + sumVal;

        //script for putting a total or sum in a table
        var table = document.getElementById("contri_table"), sumVal = 0;

        for (var i = 1; i < table.rows.length; i++) {
            sumVal = sumVal + parseInt(table.rows[i].cells[8].innerHTML);
        }
        document.getElementById("val").innerHTML = "Total Contribution = " + sumVal;
    

    
        //script for putting a total or sum in a table
        var table = document.getElementById("contri_table_summary"), sumVal = 0;

        for (var i = 1; i < table.rows.length; i++) {
            sumVal = sumVal + parseInt(table.rows[i].cells[5].innerHTML);
        }
        document.getElementById("val").innerHTML = "Total Contribution = " + sumVal;
  