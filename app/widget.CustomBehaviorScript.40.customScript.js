<?php
/**
 * Community Member
 */


if(Auth('memberof', 'community-member', 'group')){

        ?>

    var container=new Element('div', {'class':"CustomTile"});
    var communityTile=new UIMapTileButton(container,{
        height: 32,
        left: 9,
        top: 9,
        width: 32,
        containerClassName:'tileButtonContainer',
        buttonClassName:'tileButton community',
        toolTip:['Community Member', 'access community member content'],
        image:<?php  echo json_encode('http://firelight.geolive.ca/administrator/components/com_geolive/users_files/user_files_680/Uploads/oFs_X4a_[ImAgE]_[G]_QI0.png'); ?>,
        backgroundImage:<?php 
            echo  json_encode(UrlFrom(Core::WidgetDir().DS.
            'DiscussionMenu'.DS.'images'.DS.'default_tile.png'));
        ?>
    });

    (new UIMapControl(map, {
        element:container,
        anchor:google.maps.ControlPosition["RIGHT_CENTER"]
    })).addControl(); //enable this...

    var communityLayer=null
    communityTile.addEvent('click',function(){

        <?php 



    if(Core::Client()->isGuest()){
        ?>
        MapFactory.LoginWizard(map);
        <?php
    }else{
         ?>
        var zoomTo=function(){

            map.getBaseMap().setZoom(8);
            map.getBaseMap().panTo(new google.maps.LatLng(56.65429286554336,-123.98278027887346));
        }



       
        if(!communityLayer){
            communityLayer = new GeoliveLayer(map, <?php echo json_encode(MapController::LoadLayer(96)->getMetadata());?>);
            zoomTo();
            communityTile.getElement().addClass('active');
        }else{
            
            if(communityLayer.isVisible()){
                communityLayer.hide();
                communityTile.getElement().removeClass('active');
            }else{
                communityLayer.show();
                zoomTo();
                communityTile.getElement().addClass('active');
            }
        }


        

        <?php
      

    }

    ?>

    })

    <?php
}





/**
 * Proponent
 */

if(Auth('memberof', 'proponent', 'group')){
        ?>

    var container=new Element('div', {'class':"CustomTile"});
    var proposalTile=new UIMapTileButton(container,{
        height: 32,
        left: 9,
        top: 9,
        width: 32,
        containerClassName:'tileButtonContainer',
        buttonClassName:'tileButton proponent',
        toolTip:['New Project Proposal', 'proponents can create and submit proposals'],
        image:<?php  echo json_encode('http://firelight.geolive.ca/components/com_geolive/users_files/user_files_680/Uploads/7qx_[ImAgE]_[G]_5sS_Itd.png');?>,
        backgroundImage:<?php echo json_encode(UrlFrom(Core::WidgetDir().DS.'DiscussionMenu'.DS.'images'.DS.'default_tile.png'));?>
    });

    var ProposalControl=new UIMapControl(map, {
        element:container,
        anchor:google.maps.ControlPosition["RIGHT_CENTER"]
    });
    ProposalControl.addControl();

SpatialDocumentPreview.setParentTile(proposalTile, ProposalControl);
    SpatialDocumentPreview.setMap(map);

    proposalTile.addEvent('click',function(){
   
   <?php 

    if(Core::Client()->isGuest()){
        ?>
        MapFactory.LoginWizard(map);
        <?php
    }else{

       

      ?>


        var wizardTemplate = (map.getDisplayController().getWizardTemplate('ProposalTemplate'));
        if ((typeof wizardTemplate) != 'function') {
            throw 'Expecting Proposal Wizard';
        }


        var wizard = wizardTemplate((new Proposal()), {});

       wizard.buildDefaultAndShow();


      <?php 
    }
  ?>

  });





<?php 

}





/**
 * Lands Department
 */

 if(Auth('memberof', 'lands-department', 'group')){
    ?>

    var container=new Element('div', {'class':"CustomTile"});
    var landsTile=new UIMapTileButton(container,{
        height: 32,
        left: 9,
        top: 9,
        width: 32,
        containerClassName:'tileButtonContainer',
        buttonClassName:'tileButton lands-dept',
        toolTip:['Lands Department', 'access lands department member tools'],
        image:<?php  echo json_encode('http://firelight.geolive.ca/components/com_geolive/users_files/user_files_680/Uploads/Y40_6sW_[G]_[ImAgE]_Sl0.png');?>,
        backgroundImage:<?php echo json_encode(UrlFrom(Core::WidgetDir().DS.'DiscussionMenu'.DS.'images'.DS.'default_tile.png'));?>
    });

    var Control=new UIMapControl(map, {
        element:container,
        anchor:google.maps.ControlPosition["RIGHT_CENTER"]
    });
    Control.addControl();

    landsTile.addEvent('click',function(){


        <?php 



    if(Core::Client()->isGuest()){
        ?>
        MapFactory.LoginWizard(map);
        <?php
    }else{
         ?>
            
    var tab=map.getNamedValue('EmailerTab');

    if(!tab){
        return;
    }

    tab.menu.showOverlay(tab.overlay);


        <?php
      

    }

    ?>


    });


    <?php
}
?>






setTimeout(function(){


    var tab=map.getNamedValue('SearchBarTab');

    if(!tab){
        return;
    }

//load a bunch of modules
            var module=<?php
    Core::Modules();
    try {
        
        $module = Core::LoadPlugin('Firelight')->loadModule('Proposals', array());
        // die(print_r($module,true));
        if ($module) {
            echo $module->display("map", "map.getNamedValue('SearchBarTab')", 'tab', (object) array(
                    'showAdminControls'=>Auth('memberof', 'lands-department', 'group')
                )) . ";";
            ?>
                    module.load(null, tab.content, null);
                    <?php
        } else {
            echo 'null;
                    /*Failed to load Module: widget.' . $this->getInstanceName() . '.UserDetails' . '*/
                    ';
        }
    } catch (Exception $e) {
        print_r($e);
    }
    
    ?>



},1000);