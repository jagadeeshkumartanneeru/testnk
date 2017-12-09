$(function () {
    //alert("a");
    $("#secoutput").hide();
    $("#btnSearch").click(function () {
        //debugger;

        var searchtext = $('input:text').val();
        if (searchtext == "") {
            $('input:text').focus();
            return;
        }

        $("#secoutput").hide();
        document.getElementById("secbindoutput").innerHTML = "";
        document.getElementById("dvStatus").innerHTML = "";
        document.getElementById("dvStatus").innerHTML = "<p style='color:#CC9933;'>Please wait, Searching...</p>";
        //var path = "https://watson-api-explorer.mybluemix.net/discovery/api/v1/environments/77538ff4-88c1-40bb-9d68-acf0ba59e7c7/collections/d431947d-c84f-44e8-a598-61163835866c/query?query=" + searchtext + "&passages=true&count=5&version=2017-11-08"
        var path = "https://watson-api-explorer.mybluemix.net/discovery/api/v1/environments/77538ff4-88c1-40bb-9d68-acf0ba59e7c7/collections/d431947d-c84f-44e8-a598-61163835866c/query?query=" + searchtext + "&passages=false&count=10&highlight=false&passages.count=10&passages.characters=2000&deduplicate=false&version=2017-09-01"

        $.ajax({
            url: path,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic MWUwMDMzMmQtOTIyMS00OTJjLTkyZmYtOWJkZTdlYWI2MDkwOlBYRDFnUDJBQmhLZg==");
            },
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            success: function (data) {
                //debugger;
                document.getElementById("dvStatus").innerHTML = "";
                document.getElementById("secbindoutput").innerHTML = "";
                if (data.results.length > 0) {
                    var output = "";
                    for (var a = 0; a < data.results.length; a++) {
                        output = "<article class='media guide-list-item'> <div class='media-body'><div class='media-description'> <div style='color:#37465B;'>" + data.results[a].html + "</div></div><div class='media-details'></div></div></article>";
                        document.getElementById("secbindoutput").innerHTML += output;
                    }
                }
                else {
                    document.getElementById("secbindoutput").innerHTML = "<p>Relevant word not found...!<p>";
                }
                $("#secoutput").show();
            },
            error: function () {
                //alert("Cannot get data");
                document.getElementById("dvStatus").innerHTML += "<p style='padding:6px;color:red;'> An internal server error occurred. Please try again later...<p>";
                $("#secoutput").hide();
            }
        });
    });
});