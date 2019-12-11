function viewDept() {
    connection.query("SELECT name FROM department", function(err, res) {
        if (err) throw err;
        console.log(deptNames);
      })
}