const fileSystem = require('fs');
const filePathName = 'test_results.json';
const TESTSTATUS = {
    PASS : "pass",
    FAIL : "fail",
    BLOCKED : "blocked"
  };

const getPassedTests = (res)=> {
    return res.status===TESTSTATUS.PASS;
}

const getFailedTests = (res)=> {
    return res.status===TESTSTATUS.FAIL;
}

const getBlockedTests = (res)=> {
    return res.status===TESTSTATUS.BLOCKED;
}

const getTestsMoreThan10s = (res)=> {
    return (res.time!==null && res.time>10);
}


function readJsonFile(filePath) {
    try {
        const jsonString = fileSystem.readFileSync(filePath);
        return JSON.parse(jsonString);
    } catch (err){
        return err;
    }
}

function sortByTime(a,b) {
    return a.time-b.time;
}

function sortByTestName(a,b) {
    let compareTestName=0; 
        a.test_name>b.test_name ? compareTestName=1:compareTestName=-1;
        return compareTestName;
}

function printDetails() {
    const data = readJsonFile(filePathName);
        data.test_suites.forEach(testSuite => {
        testSuiteName = testSuite.suite_name;
        console.log(` Test suite names is ${testSuiteName}`)
        passedTests = testSuite.results.filter(getPassedTests);
        failedTests = testSuite.results.filter(getFailedTests);
        blockedTests = testSuite.results.filter(getBlockedTests);
        testsMoreThan10s = testSuite.results.filter(getTestsMoreThan10s);
        
        console.log(`----------Passed tests----------`);
        if(passedTests.length===0) {
            console.log(`There are no passed tests in suite: ${testSuiteName}`);}
        else {
            console.log(`Total number of passed tests = ${passedTests.length}`);
            console.log(passedTests.sort(sortByTestName));
        }
        console.log(`----------Failed tests----------`);
        if(failedTests.length===0) {
            console.log(`There are no failed tests in suite: ${testSuiteName}`);}
        else  {
            console.log(`Total number of failed tests = ${failedTests.length}`);
            console.log(failedTests.sort(sortByTestName));
        }
        
        console.log(`----------Blocked tests----------`);
        if(blockedTests.length===0) {
            console.log(`There are no blocked tests in suite: ${testSuiteName}`);}
        else {
            console.log(`Total number of blocked tests = ${blockedTests.length}`);
            //console.log(blockedTests);
        }

        console.log(`----------Tests took more than 10s----------`);
        if(testsMoreThan10s.length===0) {
            console.log(`There are no tests that took more than 10 secs in suite: ${testSuiteName}`);}
        else {
            console.log(`Total number of tests that took more than 10 secs = ${testsMoreThan10s.length}`);
            //console.log(testsMoreThan10s)};
        }

        console.log('--------------***************----------------');

    });
}

printDetails();


