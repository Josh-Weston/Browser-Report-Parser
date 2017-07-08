$(function() {
    
    //Prevent browser from loading the file in the window.
    window.addEventListener("dragover",function(e){
      e = e || event;
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
      e = e || event;
      e.preventDefault();
    },false);
    
    function dragAndDrop(event) {
        event.preventDefault();
        
        //Note: We only know the filetype once it is dropped
        switch (event.type) {
            case "dragenter":
                $('#dropTarget').toggleClass('bg-drop');
                break;
            case "dragleave":
                $('#dropTarget').toggleClass('bg-drop');
                break;
            case "drop":
                var fileUpload = event.originalEvent.dataTransfer.files[0];
                
                //As a preliminary, we make sure the file is a plain text file.
                if (fileUpload.type != 'text/plain') {
                    $('#errorModal').modal();
                    reset();
                    break;
                } else {
                                    
                    $('#fileName').text(fileUpload.name);
                    $('#btnParser').show();
                    $('#dropTarget').removeClass('bg-drop');
                    fileLoaded(fileUpload);
                    break;
                }
        }
        
    }
    
    //Parsing file should cause a modal to dropDown once complete signalling to begin download?
    $('#dropTarget').on({
        dragenter: dragAndDrop,
        dragover: dragAndDrop,
        dragleave: dragAndDrop,
        drop: dragAndDrop
    });
    
});

//Directs traffic
function fileLoaded(fileUpload) {
    
    //Returns null if there was an error, or an object with data.
    var parsedObj = parseFile(fileUpload);
    
    if (!parsedObj) {
        $('#errorModal').modal();
        reset();
    } else {
        //If returned properly formatted, then show the modal...
        $('#btnParser').text('complete!')
        $('#btnParser').removeClass('alert-info').addClass('alert-success');
        $('#downloadModal').modal();
        
        //...and append the data to the modal buttons.
        attachData(parsedObj);
    }    
}

//Function is called upon successful parsing to attach data to the buttons.
function attachData(parsedObj) {
    for (key in parsedObj) {
        if (parsedObj.hasOwnProperty(key)) {
            $('#downloadModalFooter').append(`<a download="${key}.csv" href="data:text/csv;charset=utf-8,${encodeURI(parsedObj[key])}"><button type="button" class="btn btn-primary">${key}.csv</button></a>`);
        }
    }
}

//Produces the three files we require and returns them for binding to the buttons.
function parseFile(fileUpload) {

    //Add error handling here.
    var status = 'good';
    
    
    //TODO: Insert parsing code here
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //TODO: Insert parsing code here
    let glFile = csvGenerator(),
        wideFile = csvGenerator(),
        longFile = csvGenerator()
    
    if (status === 'good') {
        return {
            GL: glFile,
            Workorders_Wide: wideFile,
            Workorders_Long: longFile
        };
    } else {
        return null;
    }
    
}

//Simple client-side CSV parsing.
//Note: because of newline qualifier '\n' we need to use encodeURI.
function csvGenerator() {
    
    var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
    var csvContent = "";
    data.forEach(function(infoArray, index){
        dataString = infoArray.join(",");
        csvContent += index < data.length-1 ? dataString + "\n" : dataString;
    });
    
    return csvContent;
    
}

//Returns applications back to original state after error/successful upload.
function reset() {
    
    $('#btnParser').hide();
    $('#fileName').text('Drag workorder file here');
    $('#dropTarget').removeClass('bg-drop');
    
}