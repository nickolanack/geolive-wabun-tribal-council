<?php 
//filter legend on user attribute values
Core::LoadPlugin('Attributes');
$attribs=AttributesRecord::GetFields(Core::Client()->getUserId(), 'user', array('isLandsDepartment', 'isCommunityMember', 'isProponent'), 'userAttributes');
if(Core::Client()->isAdmin()||Core::Client()->isGuest()){
?>
    //lands dept // or guest;
    return true;<?php
}else if($attribs['isLandsDepartment']==='true'){
   ?>
    //lands dept;
    return true;<?php
}else if($attribs['isCommunityMember']==='true'){
   ?>
    //community;
    return true;<?php
}else if($attribs['isProponent']==='true'){
   ?>
    //proponent;
    return false;<?php
}else{
    ?>
    //unknown;
    return false;<?php
}

?>