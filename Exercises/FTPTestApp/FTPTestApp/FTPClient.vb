'http://msdn.microsoft.com/en-us/library/system.net.ftpwebrequest.aspx#Y4251

Imports System.Net
Imports System.Threading
Imports System.IO

Public Class FTPClient

    Public Function upload(ByVal user As String, ByVal pwd As String, ByVal filePath As String, ByVal uri As String) As Boolean
        Dim waitObject As ManualResetEvent
        Dim target As Uri
        Dim state As FTPState
        Dim request As FtpWebRequest

        target = New Uri(uri)
        state = New FTPState()
        request = WebRequest.Create(target)
        request.Method = WebRequestMethods.Ftp.UploadFile
        request.Credentials = New NetworkCredential(user, pwd)

        state.Request = request
        state.Filename = filePath

        waitObject = state.OperationComplete
        request.BeginGetRequestStream(New AsyncCallback(AddressOf EndGetStreamCallback), state)

        waitObject.WaitOne()

        If state.OperationException Is Nothing Then
            Return True
        Else
            Return False
        End If
    End Function

    Private Shared Sub EndGetResponsCallback(ByVal ar As IAsyncResult)
        Dim state As FTPState
        Dim response As FtpWebResponse

        state = ar.AsyncState

        Try
            response = state.Request.EndGetResponse(ar)
            response.Close()
            state.StatusDescription = response.StatusDescription
            state.OperationComplete.Set()
        Catch ex As Exception
            state.OperationException = ex
            state.OperationComplete.Set()
        End Try
    End Sub

    Private Shared Sub EndGetStreamCallback(ByVal ar As IAsyncResult)
        Dim state As FTPState
        Dim requestStream As Stream

        state = ar.AsyncState

        Try
            Dim bufferLength As Integer
            bufferLength = 2048

            Dim buffer(0 To bufferLength) As Byte
            Dim count As Integer
            Dim readBytes As Integer
            Dim stream As FileStream

            count = 0
            readBytes = 0
            requestStream = state.Request.EndGetRequestStream(ar)
            stream = File.OpenRead(state.Filename)

            Do While readBytes > 0
                readBytes = stream.Read(buffer, 0, bufferLength)
                requestStream.Write(buffer, 0, readBytes)
                count = count + readBytes
            Loop
            requestStream.Close()
            state.Request.BeginGetResponse(New AsyncCallback(AddressOf EndGetResponsCallback), state)

        Catch ex As Exception
            state.OperationException = ex
            state.OperationComplete.Set()
        End Try
    End Sub
End Class
