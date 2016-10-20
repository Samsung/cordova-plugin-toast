Const ForReading = 1
Const ForWriting = 2

strFileName = "Gruntfile.js"
strOldText = "compile: {"
strNewText = "compile: {"+Chr(13)+Chr(9)+Chr(9)+Chr(9)+Chr(34)+"sectv-orsay"+Chr(34)+": {},"+Chr(13)+Chr(9)+Chr(9)+Chr(9)+Chr(34)+"sectv-tizen"+Chr(34)+": {},"+Chr(13)+Chr(9)+Chr(9)+Chr(9)+Chr(34)+"tv-webos"+Chr(34)+": {},"

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.OpenTextFile(strFileName, ForReading)

strText = objFile.ReadAll
objFile.Close
strNewText = Replace(strText, strOldText, strNewText)

Set objFile = objFSO.OpenTextFile(strFileName, ForWriting)
objFile.Write strNewText
objFile.Close


strFileName = "package.json"
strOldText = Chr(34)+"cordova-platforms"+Chr(34)+" : {"
strNewText = Chr(34)+"cordova-platforms"+Chr(34)+" : {"+Chr(13)+Chr(9)+Chr(9)+Chr(34)+"cordova-sectv-orsay"+Chr(34)+Chr(9)+Chr(9)+": "+Chr(34)+"../cordova-sectv-orsay"+Chr(34)+","+Chr(13)+Chr(9)+Chr(9)+Chr(34)+"cordova-sectv-tizen"+Chr(34)+Chr(9)+Chr(9)+": "+Chr(34)+"../cordova-sectv-tizen"+Chr(34)+","+Chr(13)+Chr(9)+Chr(9)+Chr(34)+"cordova-tv-webos"+Chr(34)+Chr(9)+Chr(9)+Chr(9)+": "+Chr(34)+"../cordova-tv-webos"+Chr(34)+","

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.OpenTextFile(strFileName, ForReading)

strText = objFile.ReadAll
objFile.Close
strNewText = Replace(strText, strOldText, strNewText)

Set objFile = objFSO.OpenTextFile(strFileName, ForWriting)
objFile.Write strNewText
objFile.Close
