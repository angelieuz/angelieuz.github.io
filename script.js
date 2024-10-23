let fetchedData = []; // Store fetched data

        function fetchData() {
            const url = 'https://compute.samford.edu/zohauth/clients/datajson';

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    fetchedData = data; // Store fetched data
                    displayData(fetchedData); // Display all data initially
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }

        function displayData(data) {
            const table = document.getElementById('data-table');

            // Clear existing rows except the header
            table.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Speed</th>
                    <th>Result</th>
                    <th>Datetime</th>
                </tr>
            `;

            data.forEach(item => {
                const row = document.createElement('tr');
                
                const idCell = document.createElement('td');
                const link = document.createElement('a');
                link.href = 'details.html';
                link.textContent = `Pitch ${item.id}`; // Assuming item.id exists
                idCell.appendChild(link);
                
                const speedCell = document.createElement('td');
                speedCell.textContent = item.speed; // Assuming item.speed exists
                
                const resultCell = document.createElement('td');
                resultCell.textContent = item.result || '--'; // Assuming item.result exists
                
                const datetimeCell = document.createElement('td');
                datetimeCell.textContent = item.datetime; // Assuming item.datetime exists
                
                row.appendChild(idCell);
                row.appendChild(speedCell);
                row.appendChild(resultCell);
                row.appendChild(datetimeCell);
                
                table.appendChild(row);
            });
        }

        function filterData() {
            const startdate = new Date(document.getElementById("startdate").value);
            const enddate = new Date(document.getElementById("enddate").value);

            // Filter fetched data by date range
            const filteredData = fetchedData.filter(item => {
                const itemDate = new Date(item.datetime); // Assuming item.datetime is in a valid date format
                return itemDate >= startdate && itemDate <= enddate;
            });

            // Display filtered data
            displayData(filteredData);
        }

        // Call the fetchData function to load the data
        fetchData();