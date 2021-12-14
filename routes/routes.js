const { poolPromise } = require('../data/config')
const sql = require('mssql');

const router = app => {
   
    //GET route for returning notes per taskID
    app.get('/returnStock/:filterString', async (req, res) => {
        let queryString = "WEB_STOCKENQUIRY ";

        if(req.params.filterString!=='EMPTY_SEARCH_STRING'){
            queryString= queryString + "@Filter= '" + req.params.filterString + "' ";
        }
        
        try {
            const pool = await poolPromise
            const result = await pool.request()

            .query(queryString)  

            res.json(result.recordset)
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    })

    app.use('/login', async (req, res) => {
        try{
            const pool = await poolPromise
            const result = await pool.request()

            .input('User', sql.VarChar, req.body.username)
            .input('Pass', sql.VarChar, req.body.password)


            .query('SELECT * FROM DTL_SECURITY WHERE Username = @User AND Password = @Pass')

            //res.json(result.recordset)
            if(result.recordset.length>0){
                res.send({
                    token: 'q>)*8n[Tfh\TyZAW',
                    username: result.recordset[0].Username,
                    userId: result.recordset[0].UserID
                });
            }
            else {
                res.status(401)
                res.send(result)
            }
        
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    })

    app.get('/returnLocations/:product', async (req, res) => {
        let queryString = "WEB_LOCATIONENQUIRY ";

        if(req.params.product!=='EMPTY_SEARCH_STRING'){
            queryString= queryString + "@Filter= '" + req.params.product + "' ";
        }
        
        try {
            const pool = await poolPromise
            const result = await pool.request()

            .query(queryString)  

            res.json(result.recordset)
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    })

}
module.exports = router;



