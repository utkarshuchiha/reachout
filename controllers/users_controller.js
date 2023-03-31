module.exports.profile=function(req,res){
    return res.render('profile',{
        title:'profile page',
        p_name:'utkarsh'
    });
}