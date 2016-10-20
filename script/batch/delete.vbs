Const ForReading = 1
Const ForWriting = 2

strFileName = "index.html"
strOldText = "<meta http-equiv=" + Chr(34) + "Content-Security-Policy" + Chr(34) + " content=" + Chr(34) + "default-src " + Chr(39) + "self" + Chr(39) + " data: gap: https://ssl.gstatic.com " + Chr(39) + "unsafe-eval" + Chr(39) + "; style-src " + Chr(39) + "self" + Chr(39) + " " + Chr(39) + "unsafe-inline" + Chr(39) + "; media-src *" + Chr(34) + ">"

strNewText = ""

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.OpenTextFile(strFileName, ForReading)

strText = objFile.ReadAll
objFile.Close
strNewText = Replace(strText, strOldText, strNewText)

Set objFile = objFSO.OpenTextFile(strFileName, ForWriting)
objFile.Write strNewText
objFile.Close