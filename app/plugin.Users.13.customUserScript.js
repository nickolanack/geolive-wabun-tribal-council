if(Core::Client()->isGuest()){
   return false;
}


Core::LoadPlugin('Attributes');
$attributeMap=array();
$attribs=AttributesRecord::GetFields(Core::Client()->getUserId(), 'user', array('isCommunityMember', 'isLandsDepartment', 'isProponent'), 'userAttributes');

if($group==='community-member'&&($attribs['isCommunityMember']==='true'||Auth('memberof', 'lands-department', 'group'))){
return true;
}

if($attribs['isLandsDepartment']==='true'&&$group==='lands-department'&&Core::Client()->isAdmin()){
return true;
}

if($group==='proponent'&&($attribs['isProponent']==='true'||Auth('memberof', 'lands-department', 'group'))){
return true;
}

if($group==='no-role'&&($attribs['isCommunityMember']!=='true'&&(!Auth('memberof', 'lands-department', 'group'))&&$attribs['isProponent']!=='true')){
  return true;
}

return false;