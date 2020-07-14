console.log("Loading Samples");

//* Use `sample_values` as the values for the bar chart.
var jsondata = "HI";
function fill_select() {
    d3.json("api/data").then (
        function(data) {
            var samples = data["samples"];
    
            for (var i = 0; i < samples.length; i++) {
                // console.log(samples[i].id, samples[i].otu_ids.length, samples[i].otu_labels.length, samples[i].sample_values.length);
                var dynamicSelect = document.getElementById("selDataset");
                var newOption = document.createElement("option");
                newOption.text = samples[i].id.toString();
                dynamicSelect.add(newOption);
            }
        }
    );
}

function optionChanged(value) {
    d3.json("api/data").then (
        function(data) {
            var samples = data["samples"];
            var names = data["names"];
            var metadata = data["metadata"];
            console.log(data);
            console.log(samples);
            // var dynamicSelect = document.getElementById("selDataset");
            // console.log(dynamicSelect.value);
            console.log(value)

            for (var i = 0; i < metadata.length; i++) {
                if(value == metadata[i].id) {
                    var div = document.getElementById('sample-metadata');
                    div.innerHTML = '<h5>Id: ' + metadata[i].id + '</h5>';
                    div.innerHTML += '<h5>ethinicity: ' + metadata[i].ethnicity + '</h5>';
                    div.innerHTML += '<h5>gender: ' + metadata[i].gender + '</h5>';
                    div.innerHTML += '<h5>age: ' + metadata[i].age + '</h5>';
                    div.innerHTML += '<h5>location: ' + metadata[i].location + '</h5>';
                    div.innerHTML += '<h5>bbtype: ' + metadata[i].bbtype + '</h5>';
                    div.innerHTML += '<h5>wfreq: ' + metadata[i].wfreq + '</h5>';
                }
            }

            for (var i = 0; i < samples.length; i++) {
                // console.log(samples[i].id, samples[i].otu_ids.length, samples[i].otu_labels.length, samples[i].sample_values.length);
                if(value == samples[i].id) {
                    var ids = []
                    for(var k = 0; k < samples[i].otu_ids.length; k++) {
                        ids.push("OTU " + samples[i].otu_ids[k]);
                    }
                    console.log(samples[i].id, samples[i].otu_ids.length, samples[i].otu_labels.length, samples[i].sample_values.length);
                    var data = [
                        {
                          y: ids,
                          x: samples[i].sample_values,
                          type: 'bar',
                          orientation: 'h',
                          text: samples[i].otu_labels,
                        }
                    ];
                    Plotly.newPlot('bar', data);



                    var trace1 = {
                        x: samples[i].otu_ids,
                        y: samples[i].sample_values,
                        text: samples[i].otu_labels,
                        mode: 'markers',
                        marker: {
                            color: samples[i].otu_ids,
                            size: samples[i].sample_values,
                        }
                    };
                      
                    var data = [trace1];
                      
                    var layout = {
                        title: 'OTU ID',
                        showlegend: false,
                    };
                      
                    Plotly.newPlot('bubble', data, layout);
                }
            }
    
            
        }
    );
}

fill_select();
