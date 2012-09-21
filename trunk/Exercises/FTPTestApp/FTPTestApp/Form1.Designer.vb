<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Form1
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.GroupBox1 = New System.Windows.Forms.GroupBox
        Me.Label5 = New System.Windows.Forms.Label
        Me.txtFileCount = New System.Windows.Forms.TextBox
        Me.Label4 = New System.Windows.Forms.Label
        Me.txtDirPath = New System.Windows.Forms.TextBox
        Me.btnBrowse = New System.Windows.Forms.Button
        Me.FolderBrowserDialog1 = New System.Windows.Forms.FolderBrowserDialog
        Me.GroupBox2 = New System.Windows.Forms.GroupBox
        Me.txtPortNum = New System.Windows.Forms.TextBox
        Me.Label6 = New System.Windows.Forms.Label
        Me.txtPassword = New System.Windows.Forms.MaskedTextBox
        Me.txtUser = New System.Windows.Forms.TextBox
        Me.Label3 = New System.Windows.Forms.Label
        Me.Label2 = New System.Windows.Forms.Label
        Me.Label1 = New System.Windows.Forms.Label
        Me.txtServer = New System.Windows.Forms.TextBox
        Me.btnFTP = New System.Windows.Forms.Button
        Me.GroupBox3 = New System.Windows.Forms.GroupBox
        Me.txtLog = New System.Windows.Forms.TextBox
        Me.GroupBox1.SuspendLayout()
        Me.GroupBox2.SuspendLayout()
        Me.GroupBox3.SuspendLayout()
        Me.SuspendLayout()
        '
        'GroupBox1
        '
        Me.GroupBox1.Controls.Add(Me.Label5)
        Me.GroupBox1.Controls.Add(Me.txtFileCount)
        Me.GroupBox1.Controls.Add(Me.Label4)
        Me.GroupBox1.Controls.Add(Me.txtDirPath)
        Me.GroupBox1.Controls.Add(Me.btnBrowse)
        Me.GroupBox1.Location = New System.Drawing.Point(13, 13)
        Me.GroupBox1.Name = "GroupBox1"
        Me.GroupBox1.Size = New System.Drawing.Size(382, 102)
        Me.GroupBox1.TabIndex = 0
        Me.GroupBox1.TabStop = False
        Me.GroupBox1.Text = "Directory"
        '
        'Label5
        '
        Me.Label5.AutoSize = True
        Me.Label5.Location = New System.Drawing.Point(164, 68)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(34, 13)
        Me.Label5.TabIndex = 4
        Me.Label5.Text = "found"
        '
        'txtFileCount
        '
        Me.txtFileCount.Location = New System.Drawing.Point(89, 65)
        Me.txtFileCount.Name = "txtFileCount"
        Me.txtFileCount.Size = New System.Drawing.Size(68, 20)
        Me.txtFileCount.TabIndex = 3
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Location = New System.Drawing.Point(7, 68)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(75, 13)
        Me.Label4.TabIndex = 2
        Me.Label4.Text = "text files (*.txt):"
        '
        'txtDirPath
        '
        Me.txtDirPath.Location = New System.Drawing.Point(89, 22)
        Me.txtDirPath.Name = "txtDirPath"
        Me.txtDirPath.Size = New System.Drawing.Size(277, 20)
        Me.txtDirPath.TabIndex = 1
        Me.txtDirPath.Text = "c://Test_Files"
        '
        'btnBrowse
        '
        Me.btnBrowse.Location = New System.Drawing.Point(7, 20)
        Me.btnBrowse.Name = "btnBrowse"
        Me.btnBrowse.Size = New System.Drawing.Size(75, 23)
        Me.btnBrowse.TabIndex = 0
        Me.btnBrowse.Text = "Browse"
        Me.btnBrowse.UseVisualStyleBackColor = True
        '
        'GroupBox2
        '
        Me.GroupBox2.Controls.Add(Me.txtPortNum)
        Me.GroupBox2.Controls.Add(Me.Label6)
        Me.GroupBox2.Controls.Add(Me.txtPassword)
        Me.GroupBox2.Controls.Add(Me.txtUser)
        Me.GroupBox2.Controls.Add(Me.Label3)
        Me.GroupBox2.Controls.Add(Me.Label2)
        Me.GroupBox2.Controls.Add(Me.Label1)
        Me.GroupBox2.Controls.Add(Me.txtServer)
        Me.GroupBox2.Controls.Add(Me.btnFTP)
        Me.GroupBox2.Location = New System.Drawing.Point(13, 144)
        Me.GroupBox2.Name = "GroupBox2"
        Me.GroupBox2.Size = New System.Drawing.Size(382, 112)
        Me.GroupBox2.TabIndex = 1
        Me.GroupBox2.TabStop = False
        Me.GroupBox2.Text = "Transmission"
        '
        'txtPortNum
        '
        Me.txtPortNum.Location = New System.Drawing.Point(325, 25)
        Me.txtPortNum.Name = "txtPortNum"
        Me.txtPortNum.Size = New System.Drawing.Size(41, 20)
        Me.txtPortNum.TabIndex = 8
        Me.txtPortNum.Text = "21"
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Location = New System.Drawing.Point(288, 28)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(29, 13)
        Me.Label6.TabIndex = 7
        Me.Label6.Text = "Port:"
        '
        'txtPassword
        '
        Me.txtPassword.Location = New System.Drawing.Point(89, 81)
        Me.txtPassword.Name = "txtPassword"
        Me.txtPassword.PasswordChar = Global.Microsoft.VisualBasic.ChrW(42)
        Me.txtPassword.Size = New System.Drawing.Size(100, 20)
        Me.txtPassword.TabIndex = 6
        Me.txtPassword.Text = "CTY3ung$umm3r"
        '
        'txtUser
        '
        Me.txtUser.Location = New System.Drawing.Point(89, 54)
        Me.txtUser.Name = "txtUser"
        Me.txtUser.Size = New System.Drawing.Size(100, 20)
        Me.txtUser.TabIndex = 5
        Me.txtUser.Text = "ctyeungc"
        '
        'Label3
        '
        Me.Label3.AutoSize = True
        Me.Label3.Location = New System.Drawing.Point(7, 84)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(56, 13)
        Me.Label3.TabIndex = 4
        Me.Label3.Text = "Password:"
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Location = New System.Drawing.Point(7, 57)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(32, 13)
        Me.Label2.TabIndex = 3
        Me.Label2.Text = "User:"
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Location = New System.Drawing.Point(7, 28)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(41, 13)
        Me.Label1.TabIndex = 2
        Me.Label1.Text = "Server:"
        '
        'txtServer
        '
        Me.txtServer.Location = New System.Drawing.Point(89, 25)
        Me.txtServer.Name = "txtServer"
        Me.txtServer.Size = New System.Drawing.Size(157, 20)
        Me.txtServer.TabIndex = 1
        Me.txtServer.Text = "ftp://ctyeung.com"
        '
        'btnFTP
        '
        Me.btnFTP.Enabled = False
        Me.btnFTP.Location = New System.Drawing.Point(291, 76)
        Me.btnFTP.Name = "btnFTP"
        Me.btnFTP.Size = New System.Drawing.Size(75, 23)
        Me.btnFTP.TabIndex = 0
        Me.btnFTP.Text = "FTP"
        Me.btnFTP.UseVisualStyleBackColor = True
        '
        'GroupBox3
        '
        Me.GroupBox3.Controls.Add(Me.txtLog)
        Me.GroupBox3.Location = New System.Drawing.Point(13, 263)
        Me.GroupBox3.Name = "GroupBox3"
        Me.GroupBox3.Size = New System.Drawing.Size(382, 108)
        Me.GroupBox3.TabIndex = 2
        Me.GroupBox3.TabStop = False
        Me.GroupBox3.Text = "Log"
        '
        'txtLog
        '
        Me.txtLog.Location = New System.Drawing.Point(10, 19)
        Me.txtLog.Multiline = True
        Me.txtLog.Name = "txtLog"
        Me.txtLog.ScrollBars = System.Windows.Forms.ScrollBars.Vertical
        Me.txtLog.Size = New System.Drawing.Size(366, 83)
        Me.txtLog.TabIndex = 0
        '
        'Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(414, 383)
        Me.Controls.Add(Me.GroupBox3)
        Me.Controls.Add(Me.GroupBox2)
        Me.Controls.Add(Me.GroupBox1)
        Me.Name = "Form1"
        Me.Text = "Exercise 1"
        Me.GroupBox1.ResumeLayout(False)
        Me.GroupBox1.PerformLayout()
        Me.GroupBox2.ResumeLayout(False)
        Me.GroupBox2.PerformLayout()
        Me.GroupBox3.ResumeLayout(False)
        Me.GroupBox3.PerformLayout()
        Me.ResumeLayout(False)

    End Sub
    Friend WithEvents GroupBox1 As System.Windows.Forms.GroupBox
    Friend WithEvents txtDirPath As System.Windows.Forms.TextBox
    Friend WithEvents btnBrowse As System.Windows.Forms.Button
    Friend WithEvents FolderBrowserDialog1 As System.Windows.Forms.FolderBrowserDialog
    Friend WithEvents GroupBox2 As System.Windows.Forms.GroupBox
    Friend WithEvents txtServer As System.Windows.Forms.TextBox
    Friend WithEvents btnFTP As System.Windows.Forms.Button
    Friend WithEvents txtPassword As System.Windows.Forms.MaskedTextBox
    Friend WithEvents txtUser As System.Windows.Forms.TextBox
    Friend WithEvents Label3 As System.Windows.Forms.Label
    Friend WithEvents Label2 As System.Windows.Forms.Label
    Friend WithEvents Label1 As System.Windows.Forms.Label
    Friend WithEvents txtFileCount As System.Windows.Forms.TextBox
    Friend WithEvents Label4 As System.Windows.Forms.Label
    Friend WithEvents Label5 As System.Windows.Forms.Label
    Friend WithEvents Label6 As System.Windows.Forms.Label
    Friend WithEvents txtPortNum As System.Windows.Forms.TextBox
    Friend WithEvents GroupBox3 As System.Windows.Forms.GroupBox
    Friend WithEvents txtLog As System.Windows.Forms.TextBox

End Class
