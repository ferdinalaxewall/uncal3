$(document).ready(function(){
    $("#flow-tab .tab-name").click(function(e){
        $("#flow-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });
    
    $("#palette-tab .tab-name").click(function(e){
        $("#palette-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();
        
    });
    
    $(".category-button") .click(function(e){
        $(".category-button").removeClass("active");
        
        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }
    
        e.preventDefault();
        
    });

    $("#properties-tab .tab-name").click(function(e){
        $("#properties-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });

    $("#flow-map-tab .tab-name").click(function(e){
        $("#flow-map-tab .tab-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });

    $("#main-menu .menu-name").click(function(e){
        $("#main-menu .menu-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });

    $("#sub-main-menu .menu-name").click(function(e){
        $("#sub-main-menu .menu-name").removeClass("active");

        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
        }

        e.preventDefault();

    });
    
    $("#properties-group .list-item").click(function(e){
        $(this).toggleClass("active");
    });
    
    $("#flow-map-group .list-item").click(function(e){
        $(this).toggleClass("active");
    });

    $(".list-sub-item").parent().addClass("has-child");

});

function focusElement(e) {
    $(".flow-diagram .element-item, .flow-diagram .element-box").removeClass("focus");
    setTimeout(function(){
      $(e).toggleClass("focus")
      $(e).parent().toggleClass("focus");
    }, 1);

    // auto open by file name
    var getTypeComp = $(e).prop("id");
    $("#properties").empty();
    $("#properties").load("components/"+getTypeComp+".html");
    
    // fill data ke properties (auto nama id)
    var data_id = $(e).parent().attr("data_id");
    var indexFlow = data_id.split("-")[0];
    // console.log('focusElement. data_id', data_id, "indexFlow", indexFlow);
    var jsonFlow = JSON.parse(localStorage.getItem("jsonFlow"));
    console.log("focusElement. jsonFlow", jsonFlow[indexFlow]);
    
    function recurJsonFlow(jsonFlowIndex){
        var components = jsonFlowIndex.components;
        for (let x = 0; x < components.length; x++) {
            const comp = components[x];
            var name = comp.name;
            var type = comp.type;
            var id = comp.id;
            var properties = comp.properties;
            
            if(data_id == id){
                console.log("name:", name, "| type:", type, "| id:", id, "| properties:", properties);
                for (const key in properties) {
                    var value = properties[key];
                    // console.log('key', key, 'properties', properties[key]);
                    var finalData = type + '-' + key;
                    var typeValue = typeof value;
                    console.log('finalData. value:', value, '| type:', typeValue);

                   if(typeValue == 'boolean'){
                        if(value == true){
                            $("#"+finalData).attr('checked', true);
                        } else {
                            $("#"+finalData).attr('checked', false);
                        }
                    } else {
                        $("#"+finalData).val(value);
                    }
                }
            }

            if(type == 'object-switching'){
                recurJsonFlow(comp);
            }
        }
    }

    setTimeout(function(){
        // isi data ke properties
        recurJsonFlow(jsonFlow[indexFlow]);

        // edit properties
        console.log('edit', '#'+getTypeComp+"-page");
        $('#'+getTypeComp+"-page").attr("prop_id", data_id);

        $('#'+getTypeComp+"-page").find("input").unbind("click");
        $('#'+getTypeComp+"-page").find("input").each(function(){
            // console.log("edit:", $(this));

            // edit component di local storage
            $(this).keyup(function() {
                var idThis = $(this).attr('id');
                var valueThis = $(this).val();
                var prop_id = $(this).parent().parent().parent().attr('prop_id');
                // console.log("edit. idThis:", idThis, "| valueThis:", valueThis, "| prop_id:", prop_id);

                var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
                var indexFlowThis = prop_id.split('-')[0];
                findComp(jsonFlowThis[indexFlowThis]);
                function findComp(jsonFlowIndex){
                    var components = jsonFlowIndex.components;
                    for (let x = 0; x < components.length; x++) {
                        const comp = components[x];
                        var name = comp.name;
                        var type = comp.type;
                        var id = comp.id;
                        var properties = comp.properties;

                        if(prop_id == id){
                            var propName = idThis.replace(type + "-", "");
                            console.log("propName: ", propName);
                            properties[propName] = valueThis;
                            // console.log("findComp. name:", name, "| type:", type, "| id:", id, "| properties:", properties, "| jsonFlowThis:", jsonFlowThis);
                            localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
                        }
                    }
                }
            });
        });
        
    }, 300);
    
    // klik keyboard di component
    $(document).keydown(function(e){
        var key = (e.keyCode ? e.keyCode : e.which);
        if (key === 8) {
            $(".element-item.focus").remove();
            
            if ($(".flow-diagram").children().length == 0) {
                $(".flow-diagram, br").remove();
            }
            
            // validasi hapus properties
            var getEl = $(".element-item.focus");
            var data_id = getEl.attr("data_id");
            var prop_id = $("#properties").children(":first").attr("prop_id");
            if(data_id != undefined){
                $("#properties").empty();
                
                // hapus component di localStorage
                var jsonFlowThis = JSON.parse(localStorage.getItem("jsonFlow"));
                var indexFlowThis = prop_id.split('-')[0];
                console.log("indexFlowThis: ", indexFlowThis);
                findComp(jsonFlowThis[indexFlowThis]);
                function findComp(jsonFlowIndex){
                    var components = jsonFlowIndex.components;
                    for (let x = 0; x < components.length; x++) {
                        const comp = components[x];
                        var name = comp.name;
                        var type = comp.type;
                        var id = comp.id;
                        var properties = comp.properties;
    
                        if(prop_id == id){
                            console.log("findComp del. name:", name, "| type:", type, "| id:", id, "| properties:", properties, "| jsonFlowThis:", jsonFlowThis);
                            components.splice(x, 1);
                            localStorage.setItem("jsonFlow", JSON.stringify(jsonFlowThis));
                        }
                    }
                }
            }

        }
    });
   
    $(document).click(function(a){
      if (!e.contains(a.target)) {
        $(".flow-diagram .element-item, .flow-diagram .element-box").removeClass("focus");
      }
    });
    
}


function minimizeFlow(minimize){
    $(minimize).toggleClass("minimize");
    $(minimize).parent().siblings(".element-item").fadeToggle();
    $(minimize).parent().parent().toggleClass("minimize-flow-diagram");

}
