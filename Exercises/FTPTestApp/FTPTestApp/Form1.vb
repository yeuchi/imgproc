'Exercise #1
'Create a basic sub routine in VB.Net that will:
'o Capture all “.txt” files in a the directory C:/Test_Files/
'o Store all necessary information in an array, a series of arrays, or a multi
'dimensional array. (this would include: file name, directory path, etc.)
'o Then proceed to land (move these files) to the below FTP server directory
'path: //ftpServer.com/
'Parameters:
'o There will be several file types in the directory C:/Test_Files/ that are not “.txt” files.
'o The username for //ftpServer.com/ is: Guest
'o The password for //ftpServer.com/ is: pwd
'o The port for //ftpServer.com/ is: 21 (default for ftp)
'
' Author:   CT Yeung
' Date:     18Sept12
Imports System.IO
Imports FTPClient


Public Class Form1

    Dim listFiles
    Dim count

    Private Sub btnBrowse_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnBrowse.Click
        btnFTP.Enabled = False
        Dim BrowseFolder As New FolderBrowserDialog
        If BrowseFolder.ShowDialog() = Windows.Forms.DialogResult.OK Then
            txtDirPath.Text = BrowseFolder.SelectedPath

            Dim di As DirectoryInfo = New DirectoryInfo(txtDirPath.Text)
            If di.Exists Then
                listFiles = di.GetFiles()
                count = 0

                For Each file In listFiles
                    If file.Extension = ".txt" Then
                        count = count + 1
                        btnFTP.Enabled = True
                    End If
                Next
                txtFileCount.Text = count.ToString()

            End If
        End If
    End Sub

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnFTP.Click
        If count And count > 0 Then
            'http://msdn.microsoft.com/en-us/library/system.net.ftpwebrequest.aspx#Y4251
            Dim ftp As FTPClient
            Dim iRet
            Dim index As Integer
            index = 0


            For Each file In listFiles
                If file.Extension = ".txt" Then
                    ftp = New FTPClient()
                    iRet = ftp.upload(txtUser.Text, txtPassword.Text, file.Fullname, txtServer.Text + "//" + file.Name)

                    If iRet = True Then
                        txtLog.Text &= "Success " & index.ToString() & " " & file.Fullname & vbCrLf
                    Else
                        txtLog.Text &= "Failed " & index.ToString() & " " & file.Fullname & vbCrLf
                    End If
                    index = index + 1
                End If
            Next

        End If
    End Sub
End Class
