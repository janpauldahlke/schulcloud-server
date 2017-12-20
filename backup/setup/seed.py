import os

for filename in os.listdir(os.getcwd()):
    print(len(filename.split('.')))
    if len(filename.split('.'))  <= 2:
        string = str('mongoimport --db schulcloud --collection '+str(filename.split('.')[0])+' --drop --jsonArray '+str(filename))
        print(string)
        os.popen(string).read()
    else:
        continue
