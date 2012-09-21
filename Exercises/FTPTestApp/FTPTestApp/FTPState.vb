'http://msdn.microsoft.com/en-us/library/system.net.ftpwebrequest.aspx#Y4251

Imports System.Threading
Imports System.Net

Public Class FTPState
    Private wait As ManualResetEvent
    Private _request As FtpWebRequest
    Private _filename As String
    Private _operationException As Exception
    Private _statusDescription As String

    Sub New()
        wait = New ManualResetEvent(False)
    End Sub

    ReadOnly Property OperationComplete() As ManualResetEvent
        Get
            Return wait
        End Get
    End Property

    Property Request() As FtpWebRequest
        Get
            Return _request
        End Get
        Set(ByVal value As FtpWebRequest)
            _request = value
        End Set
    End Property

    Property Filename() As String
        Get
            Return _filename
        End Get
        Set(ByVal value As String)
            _filename = value
        End Set
    End Property

    Property OperationException() As Exception
        Get
            Return _operationException
        End Get
        Set(ByVal value As Exception)
            _operationException = value
        End Set
    End Property

    Property StatusDescription() As String
        Get
            Return _statusDescription
        End Get
        Set(ByVal value As String)
            _statusDescription = value
        End Set
    End Property
End Class
