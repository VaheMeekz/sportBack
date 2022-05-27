var express = require('express');
var router = express.Router();
const teamController = require("../controllers/team.Controller")

router.post('/',teamController.create)
router.get('/',teamController.getAll)
router.post('/edit',teamController.editTeam)
router.get('/single',teamController.getSingle)
router.get('/myTeams',teamController.myTeams)
router.post('/deleteTeam',teamController.deleteTeam)
router.post('/deleteTeammate',teamController.deleteTeamMete)
module.exports = router