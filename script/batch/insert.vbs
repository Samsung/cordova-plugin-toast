Const ForReading = 1
Const ForWriting = 2

strFileName = "index.html"

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.OpenTextFile(strFileName, ForReading)

strText = objFile.ReadAll
objFile.Close

strOldText = "</body>"
strNewText = "<script type="+Chr(34)+"text/javascript"+Chr(34)+" src="+Chr(34)+"cordova.js"+Chr(34)+"></script></body>"

If InStr(strText, "cordova.js") <= 0 Then
    strNewText = Replace(strText, strOldText, strNewText)
    Set objFile = objFSO.OpenTextFile(strFileName, ForWriting)
    objFile.Write strNewText
    objFile.Close
End If

set objFile = objFSO.OpenTextFile(strFileName, ForReading)
strText = objFile.ReadAll
objFile.Close

strNewText = "<script type="+Chr(34)+"text/javascript"+Chr(34)+" src="+Chr(34)+"toast.js"+Chr(34)+"></script></body>"

If InStr(strText, "toast.js") <= 0 Then
    strNewText = Replace(strText, strOldText, strNewText)
    Set objFile = objFSO.OpenTextFile(strFileName, ForWriting)
    objFile.Write strNewText
    objFile.Close
End If


