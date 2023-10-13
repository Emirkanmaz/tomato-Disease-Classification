Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        
        $("#resultHolder").hide();
        var url = "http://127.0.0.1:5000/predict";
        // var url = "/api/classify_image"

        $.post(url, {
            image_data: file.dataURL
        },function(data, status) {
          
            console.log(data);

            $("#resultHolder").show();
            $("#class").text(data.class);
            $("#confidence").text(data.confidence + "%");

       
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log( "ready!" );


    init();
});