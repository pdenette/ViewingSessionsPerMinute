def main():
    logFileDirectory = getLogFileLocation()
    parseLogFile(logFileDirectory)


def getLogFileLocation():
    logFileDirectory = input('Please Enter the location of the log file: ')

    return logFileDirectory


def parseLogFile(logFileDirectory):
    print(logFileDirectory+'plb.sep_single.log')
    f = open(logFileDirectory+'plb.sep_single.log')
    while True:
        text = f.readline()
        # if re.match(r'reqBegin.+?(?=POST).+?ViewingSession\"', text) in text:
            print(text)


        # this stays at the bottom
if __name__ == "__main__":
    main()
