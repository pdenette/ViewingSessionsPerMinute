import json
import time
from calendar import timegm
from datetime import datetime


def main():
    logFileDirectory = getLogFileLocation()
    parseLogFile(logFileDirectory)


def getLogFileLocation():
    logFileDirectory = input('Please Enter the location of the log file: ')

    return logFileDirectory


def parseLogFile(logFileDirectory):
    vsdatearray = []
    with open(logFileDirectory + '\plb.sep_single.log', 'r') as fp:
        for line in fp:
            data = json.loads(line)
            if 'req' in data and 'url' in data['req'] and data['req']['url'] == 'http://127.0.0.1:19000/PCCIS/V1/ViewingSession':
                vsdatearray.append(data['time'])
        totalViewingsessionCount = len(vsdatearray)
        firstPostDate = datetime.strptime(
            vsdatearray[0].replace('T', ' '),
            '%Y-%m-%d %H:%M:%S.%fZ'
        )
        lastPostDate = datetime.strptime(
            vsdatearray[len(vsdatearray)-1].replace('T', ' '),
            '%Y-%m-%d %H:%M:%S.%fZ'
        )
        dateDifferenceInMinutes = ((time.mktime(lastPostDate.timetuple()) -
                                    time.mktime(firstPostDate.timetuple()))/60)
        print("Total Number of Viewing Sessions Created between ",
              firstPostDate, " and ", lastPostDate, " is ", totalViewingsessionCount)
        print("The number of viewing sessiond per minute calculated is ",
              totalViewingsessionCount / dateDifferenceInMinutes)



    # this stays at the bottom
if __name__ == "__main__":
    main()
